/**
 * Custom Image Classification Model with Optimized Preprocessing and Postprocessing
 */

import * as tf from '@tensorflow/tfjs';
import { InferenceConfig, InferenceResult, OptimizedInferenceEngine } from './inference';

// Define input and output types for image classification
export interface ImageClassificationInput {
    imageData: ImageData | Uint8Array | Float32Array;
    width: number;
    height: number;
    channels?: number;
}

export interface ImageClassificationOutput {
    className: string;
    confidence: number;
    topClasses: Array<{ className: string; confidence: number }>;
    rawLogits?: Float32Array;
}

// Class labels for ImageNet classification
const IMAGENET_CLASSES: string[] = [
    'tench', 'goldfish', 'great white shark', 'tiger shark', 'hammerhead shark',
    'electric ray', 'stingray', 'cock', 'hen', 'ostrich', 'brambling', 'goldfinch',
    // ... (truncated for brevity - in a real implementation, include all 1000 ImageNet classes)
];

/**
 * Optimized Image Classification Engine
 */
export class OptimizedImageClassifier extends OptimizedInferenceEngine<ImageClassificationInput, ImageClassificationOutput> {
    private imageSize: number;
    private meanRGB: [number, number, number];
    private stdRGB: [number, number, number];
    private topK: number;
    private classLabels: string[];

    /**
     * Create a new optimized image classifier
     * @param config Inference configuration
     * @param options Additional options for image classification
     */
    constructor(
        config: InferenceConfig,
        options: {
            imageSize?: number;
            meanRGB?: [number, number, number];
            stdRGB?: [number, number, number];
            topK?: number;
            classLabels?: string[];
        } = {}
    ) {
        super(config);

        // Set default values or use provided options
        this.imageSize = options.imageSize || 224;
        this.meanRGB = options.meanRGB || [0.485, 0.456, 0.406]; // ImageNet mean
        this.stdRGB = options.stdRGB || [0.229, 0.224, 0.225]; // ImageNet std
        this.topK = options.topK || 5;
        this.classLabels = options.classLabels || IMAGENET_CLASSES;
    }

    /**
     * Optimized preprocessing for image classification
     * @param input Image input data
     * @returns Preprocessed tensor ready for inference
     */
    protected async preprocess(input: ImageClassificationInput): Promise<tf.Tensor> {
        // Start preprocessing in a tidy to automatically clean up intermediate tensors
        return tf.tidy(() => {
            let imageTensor: tf.Tensor3D | tf.Tensor4D;

            // Convert input to tensor based on input type
            if (input.imageData instanceof ImageData) {
                // Browser ImageData object
                imageTensor = tf.browser.fromPixels(input.imageData);
            } else if (input.imageData instanceof Uint8Array) {
                // Raw Uint8Array data
                imageTensor = tf.tensor3d(
                    Array.from(input.imageData),
                    [input.height, input.width, input.channels || 3],
                    'int32'
                );
            } else {
                // Float32Array data (already normalized)
                imageTensor = tf.tensor3d(
                    Array.from(input.imageData),
                    [input.height, input.width, input.channels || 3],
                    'float32'
                );
            }

            // Resize image if needed
            if (input.width !== this.imageSize || input.height !== this.imageSize) {
                imageTensor = tf.image.resizeBilinear(imageTensor, [this.imageSize, this.imageSize]);
            }

            // Expand dimensions to create batch of 1 if needed
            if (imageTensor.shape.length === 3) {
                imageTensor = tf.expandDims(imageTensor, 0);
            }

            // Normalize pixel values from [0,255] to [0,1]
            let normalized = tf.div(imageTensor, 255.0);

            // Apply mean subtraction and std division (ImageNet normalization)
            const mean = tf.tensor1d(this.meanRGB);
            const std = tf.tensor1d(this.stdRGB);
            normalized = tf.div(tf.sub(normalized, mean), std);

            return normalized;
        });
    }

    /**
     * Optimized postprocessing for image classification
     * @param output Model output tensor
     * @returns Processed classification results
     */
    protected async postprocess(output: tf.Tensor): Promise<ImageClassificationOutput> {
        return tf.tidy(() => {
            // Get the raw logits from the model output
            const logits = output as tf.Tensor2D;

            // Apply softmax to convert logits to probabilities
            const probabilities = tf.softmax(logits);

            // Get the top K predictions
            const { values, indices } = tf.topk(probabilities, this.topK);

            // Convert to JavaScript arrays
            const topKValues = values.dataSync();
            const topKIndices = indices.dataSync();

            // Map indices to class names and create result object
            const topClasses = Array.from(topKIndices).map((index, i) => ({
                className: this.classLabels[index] || `Class ${index}`,
                confidence: topKValues[i]
            }));

            // Create the final result
            const result: ImageClassificationOutput = {
                className: topClasses[0].className,
                confidence: topClasses[0].confidence,
                topClasses,
                rawLogits: new Float32Array(logits.dataSync())
            };

            return result;
        });
    }

    /**
     * Classify an image from a URL
     * @param imageUrl URL of the image to classify
     * @returns Classification result with performance metrics
     */
    async classifyFromUrl(imageUrl: string): Promise<InferenceResult<ImageClassificationOutput>> {
        // Load the image
        const image = await this.loadImageFromUrl(imageUrl);

        // Convert to ImageData
        const imageData = this.imageToImageData(image);

        // Classify the image
        return this.predict({
            imageData,
            width: image.width,
            height: image.height,
            channels: 3
        });
    }

    /**
     * Load an image from a URL
     * @param url Image URL
     * @returns HTML Image element
     */
    private async loadImageFromUrl(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(new Error(`Failed to load image: ${err}`));
            img.src = url;
        });
    }

    /**
     * Convert an HTML Image element to ImageData
     * @param image HTML Image element
     * @returns ImageData object
     */
    private imageToImageData(image: HTMLImageElement): ImageData {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Failed to get canvas context');
        }

        ctx.drawImage(image, 0, 0);
        return ctx.getImageData(0, 0, image.width, image.height);
    }

    /**
     * Classify an image from a file (Node.js environment)
     * @param filePath Path to the image file
     * @returns Classification result with performance metrics
     */
    async classifyFromFile(filePath: string): Promise<InferenceResult<ImageClassificationOutput>> {
        // This implementation is for Node.js environment
        if (typeof window !== 'undefined') {
            throw new Error('classifyFromFile is only available in Node.js environment');
        }

        // Import Node.js specific modules
        const fs = require('fs');
        const { createCanvas, loadImage } = require('canvas');

        // Load the image
        const image = await loadImage(filePath);

        // Create canvas and draw image
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, image.width, image.height);

        // Classify the image
        return this.predict({
            imageData: imageData.data,
            width: image.width,
            height: image.height,
            channels: 4 // RGBA
        });
    }
} 