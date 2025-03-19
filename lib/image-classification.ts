/**
 * Custom Image Classification Model with Optimized Preprocessing and Postprocessing
 */

export interface ImageClassificationInput {
    imageData: Uint8Array;
}

interface ClassPrediction {
    class: string;
    confidence: number;
}

export interface ImageClassificationOutput {
    className: string;
    confidence: number;
    topClasses: ClassPrediction[];
    rawLogits: Float32Array;
}

// Class labels for ImageNet classification
const IMAGENET_CLASSES: string[] = [
    'tench', 'goldfish', 'great white shark', 'tiger shark', 'hammerhead shark',
    'electric ray', 'stingray', 'cock', 'hen', 'ostrich', 'brambling', 'goldfinch',
    // ... (truncated for brevity - in a real implementation, include all 1000 ImageNet classes)
];

/**
 * Client-side image classifier that uses the ML API endpoint
 */
export class OptimizedImageClassifier {
    private classLabels: string[];
    private topK: number;

    constructor(classLabels: string[], topK: number = 5) {
        this.classLabels = classLabels;
        this.topK = topK;
    }

    /**
     * Predict the class of an image
     * @param input Image input data
     * @returns Classification result
     */
    async predict(input: ImageClassificationInput): Promise<ImageClassificationOutput> {
        try {
            const response = await fetch('/api/ml', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'image-classification',
                    input,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Image classification failed:', error);
            throw error;
        }
    }

    /**
     * Classify an image from a file (Node.js environment)
     * @param filePath Path to the image file
     * @returns Classification result
     */
    async classifyFromFile(filePath: string): Promise<ImageClassificationOutput> {
        if (typeof window !== 'undefined') {
            throw new Error('classifyFromFile is only available in Node.js environment');
        }

        try {
            // Import Node.js specific modules
            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
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
        } catch (error) {
            throw new Error(`Failed to classify image from file: ${error.message}`);
        }
    }
} 