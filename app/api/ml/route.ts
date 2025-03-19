import { ImageClassificationInput, ImageClassificationOutput } from '@/lib/image-classification';
import { TextClassificationInput, TextClassificationOutput } from '@/lib/text-classification';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { rateLimit } from '@/lib/rate-limit';

// Import TensorFlow.js only on the server side
let tf: typeof import('@tensorflow/tfjs-node');

// Initialize TensorFlow.js lazily
async function initTF() {
  if (!tf) {
    tf = await import('@tensorflow/tfjs-node');
  }
  return tf;
}

export async function POST(request: Request) {
  try {
    // Authentication check
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Rate limiting
    const identifier = token.email || token.sub; // Use email or subject as identifier
    const { success, limit, remaining, reset } = await rateLimit(identifier);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          reset,
          limit,
          remaining 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      );
    }

    // Input validation
    const body = await request.json();
    const { type, input } = body;

    if (!type || !input) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize TensorFlow.js
    await initTF();

    let result;

    switch (type) {
      case 'image-classification':
        result = await handleImageClassification(input);
        break;
      case 'text-classification':
        result = await handleTextClassification(input);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid classification type' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('ML API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleImageClassification(
  input: ImageClassificationInput
): Promise<ImageClassificationOutput> {
  try {
    // Convert input image to tensor
    const imageTensor = tf.node.decodeImage(input.imageData);
    
    // Preprocess the image
    const preprocessed = imageTensor
      .resizeBilinear([224, 224]) // Resize to model input size
      .expandDims(0) // Add batch dimension
      .toFloat()
      .div(255.0); // Normalize to [0,1]

    // TODO: Load and run your model here
    // const model = await tf.loadLayersModel('path/to/your/model');
    // const predictions = model.predict(preprocessed);

    // Cleanup
    imageTensor.dispose();
    preprocessed.dispose();

    // Return placeholder results for now
    return {
      className: 'placeholder',
      confidence: 0.95,
      topClasses: [
        { class: 'placeholder1', confidence: 0.95 },
        { class: 'placeholder2', confidence: 0.03 },
        { class: 'placeholder3', confidence: 0.02 }
      ],
      rawLogits: new Float32Array([0.95, 0.03, 0.02])
    };
  } catch (error) {
    console.error('Image classification error:', error);
    throw error;
  }
}

async function handleTextClassification(
  input: TextClassificationInput
): Promise<TextClassificationOutput> {
  try {
    if (!input.text || typeof input.text !== 'string') {
      throw new Error('Invalid text input');
    }

    // TODO: Implement text tokenization and classification
    // const tokenizer = new Tokenizer();
    // const tokens = tokenizer.tokenize(input.text);
    // const model = await tf.loadLayersModel('path/to/your/model');
    // const predictions = model.predict(tokens);

    // Return placeholder results for now
    return {
      className: 'placeholder',
      confidence: 0.88,
      topClasses: [
        { class: 'placeholder1', confidence: 0.88 },
        { class: 'placeholder2', confidence: 0.07 },
        { class: 'placeholder3', confidence: 0.05 }
      ],
      rawLogits: new Float32Array([0.88, 0.07, 0.05])
    };
  } catch (error) {
    console.error('Text classification error:', error);
    throw error;
  }
} 