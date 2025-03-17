/**
 * Custom Text Classification Model with Optimized Preprocessing and Postprocessing
 */

import * as tf from '@tensorflow/tfjs';
import { InferenceConfig, InferenceResult, OptimizedInferenceEngine } from './inference';
import { createRequire } from 'module';

// Define input and output types for text classification
export interface TextClassificationInput {
    text: string;
    maxLength?: number;
}

export interface TextClassificationOutput {
    className: string;
    confidence: number;
    topClasses: Array<{ className: string; confidence: number }>;
    rawLogits?: Float32Array;
}

/**
 * Optimized Text Classification Engine
 */
export class OptimizedTextClassifier extends OptimizedInferenceEngine<TextClassificationInput, TextClassificationOutput> {
    private vocabulary: Map<string, number>;
    private maxLength: number;
    private classLabels: string[];
    private topK: number;
    private tokenizer: (text: string) => string[];

    /**
     * Create a new optimized text classifier
     * @param config Inference configuration
     * @param options Additional options for text classification
     */
    constructor(
        config: InferenceConfig,
        options: {
            vocabulary?: Map<string, number> | Record<string, number>;
            maxLength?: number;
            classLabels?: string[];
            topK?: number;
            tokenizer?: (text: string) => string[];
        } = {}
    ) {
        super(config);

        // Convert vocabulary object to Map if needed
        this.vocabulary = options.vocabulary instanceof Map
            ? options.vocabulary
            : new Map(Object.entries(options.vocabulary || {}));

        // Set default values or use provided options
        this.maxLength = options.maxLength || 128;
        this.classLabels = options.classLabels || ['negative', 'positive'];
        this.topK = options.topK || 2;

        // Default tokenizer splits on whitespace and removes punctuation
        this.tokenizer = options.tokenizer || ((text: string) => {
            return text
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .split(/\s+/)
                .filter(token => token.length > 0);
        });
    }

    /**
     * Optimized preprocessing for text classification
     * @param input Text input data
     * @returns Preprocessed tensor ready for inference
     */
    protected async preprocess(input: TextClassificationInput): Promise<tf.Tensor> {
        return tf.tidy(() => {
            // Tokenize the input text
            const tokens = this.tokenizer(input.text);

            // Convert tokens to token IDs using vocabulary
            const tokenIds = tokens.map(token => {
                return this.vocabulary.get(token) || 0; // 0 for unknown tokens
            });

            // Truncate or pad sequence to maxLength
            const maxLength = input.maxLength || this.maxLength;
            let paddedTokenIds: number[];

            if (tokenIds.length > maxLength) {
                // Truncate
                paddedTokenIds = tokenIds.slice(0, maxLength);
            } else {
                // Pad with zeros
                paddedTokenIds = [...tokenIds];
                while (paddedTokenIds.length < maxLength) {
                    paddedTokenIds.push(0);
                }
            }

            // Convert to tensor
            const inputTensor = tf.tensor2d([paddedTokenIds], [1, maxLength], 'int32');

            return inputTensor;
        });
    }

    /**
     * Optimized postprocessing for text classification
     * @param output Model output tensor
     * @returns Processed classification results
     */
    protected async postprocess(output: tf.Tensor): Promise<TextClassificationOutput> {
        // Use a variable to store the result outside of tf.tidy
        let result: TextClassificationOutput;
        
        tf.tidy(() => {
            // Get the raw logits from the model output
            const logits = output as tf.Tensor2D;

            // Apply softmax to convert logits to probabilities
            const probabilities = tf.softmax(logits);

            // Get the top K predictions
            const { values, indices } = tf.topk(probabilities, Math.min(this.topK, this.classLabels.length));

            // Convert to JavaScript arrays
            const topKValues = values.dataSync();
            const topKIndices = indices.dataSync();

            // Map indices to class names and create result object
            const topClasses = Array.from(topKIndices).map((index, i) => ({
                className: this.classLabels[index] || `Class ${index}`,
                confidence: topKValues[i]
            }));

            // Create the final result
            result = {
                className: topClasses[0].className,
                confidence: topClasses[0].confidence,
                topClasses,
                rawLogits: new Float32Array(logits.dataSync())
            };
        });

        return result!;
    }

    /**
     * Classify text
     * @param text Text to classify
     * @param maxLength Optional maximum length
     * @returns Classification result with performance metrics
     */
    async classifyText(text: string, maxLength?: number): Promise<InferenceResult<TextClassificationOutput>> {
        return this.predict({
            text,
            maxLength
        });
    }

    /**
     * Batch classify multiple texts
     * @param texts Array of texts to classify
     * @param maxLength Optional maximum length
     * @returns Array of classification results with performance metrics
     */
    async batchClassifyTexts(texts: string[], maxLength?: number): Promise<InferenceResult<TextClassificationOutput>[]> {
        const inputs = texts.map(text => ({
            text,
            maxLength
        }));

        return this.predictBatch(inputs);
    }

    /**
     * Load vocabulary from a file (Node.js environment)
     * @param filePath Path to vocabulary file (one token per line)
     * @returns Map of tokens to IDs
     */
    static async loadVocabularyFromFile(filePath: string): Promise<Map<string, number>> {
        if (typeof window !== 'undefined') {
            throw new Error('loadVocabularyFromFile is only available in Node.js environment');
        }

        const require = createRequire(import.meta.url);
        const fs = require('fs');
        const readline = require('readline');

        const vocabulary = new Map<string, number>();

        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let index = 0;
        for await (const line of rl) {
            const token = line.trim();
            if (token) {
                vocabulary.set(token, index++);
            }
        }

        return vocabulary;
    }

    /**
     * Load vocabulary from a JSON file
     * @param filePath Path to JSON vocabulary file
     * @returns Map of tokens to IDs
     */
    static async loadVocabularyFromJson(filePath: string): Promise<Map<string, number>> {
        if (typeof window !== 'undefined') {
            // Browser environment
            const response = await fetch(filePath);
            const json = await response.json();
            return new Map(Object.entries(json));
        } else {
            // Node.js environment
            const require = createRequire(import.meta.url);
            const fs = require('fs');
            const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return new Map(Object.entries(json));
        }
    }
} 