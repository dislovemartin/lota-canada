/**
 * Custom Text Classification Model with Optimized Preprocessing and Postprocessing
 */

export interface TextClassificationInput {
    text: string;
    maxLength?: number;
}

interface ClassPrediction {
    class: string;
    confidence: number;
}

export interface TextClassificationOutput {
    className: string;
    confidence: number;
    topClasses: ClassPrediction[];
    rawLogits: Float32Array;
}

/**
 * Client-side text classifier that uses the ML API endpoint
 */
export class OptimizedTextClassifier {
    private classLabels: string[];
    private topK: number;

    constructor(classLabels: string[], topK: number = 5) {
        this.classLabels = classLabels;
        this.topK = topK;
    }

    /**
     * Predict the class of a text input
     * @param input Text input data
     * @returns Classification result
     */
    async predict(input: TextClassificationInput): Promise<TextClassificationOutput> {
        try {
            const response = await fetch('/api/ml', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'text-classification',
                    input,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Text classification failed:', error);
            throw error;
        }
    }

    /**
     * Classify text from a file (Node.js environment)
     * @param filePath Path to the text file
     * @returns Classification result
     */
    async classifyFromFile(filePath: string): Promise<TextClassificationOutput> {
        if (typeof window !== 'undefined') {
            throw new Error('classifyFromFile is only available in Node.js environment');
        }

        try {
            // Import Node.js specific modules
            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
            const fs = require('fs');

            // Read the file
            const text = await fs.promises.readFile(filePath, 'utf8');

            // Classify the text
            return this.predict({
                text,
                maxLength: this.maxLength
            });
        } catch (error) {
            throw new Error(`Failed to classify text from file: ${error.message}`);
        }
    }
} 