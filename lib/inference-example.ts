/**
 * Example usage of the optimized inference engine
 */

import { InferenceConfig, OptimizedInferenceEngine } from './inference';

// Example input and output types
interface ImageInput {
    url: string;
    width: number;
    height: number;
}

interface ClassificationOutput {
    className: string;
    confidence: number;
    topClasses: Array<{ className: string; confidence: number }>;
}

/**
 * Example image classification engine
 */
class ImageClassificationEngine extends OptimizedInferenceEngine<ImageInput, ClassificationOutput> {
    /**
     * Override preprocess method for image classification
     * @param input Image input
     * @returns Preprocessed tensor
     */
    protected async preprocess(input: ImageInput): Promise<any> {
        console.log(`Preprocessing image: ${input.url}`);

        // In a real implementation, this would:
        // 1. Load the image
        // 2. Resize to model input dimensions
        // 3. Normalize pixel values
        // 4. Convert to tensor

        // For demonstration purposes, we'll just create a dummy tensor
        return { tensor: [1, 2, 3, 4] };
    }

    /**
     * Override postprocess method for image classification
     * @param output Model output tensor
     * @returns Classification result
     */
    protected async postprocess(output: any): Promise<ClassificationOutput> {
        console.log('Postprocessing classification results');

        // In a real implementation, this would:
        // 1. Convert logits to probabilities
        // 2. Map indices to class names
        // 3. Sort by confidence

        // For demonstration purposes, we'll just return dummy results
        return {
            className: 'cat',
            confidence: 0.95,
            topClasses: [
                { className: 'cat', confidence: 0.95 },
                { className: 'dog', confidence: 0.03 },
                { className: 'bird', confidence: 0.02 }
            ]
        };
    }
}

/**
 * Example function demonstrating how to use the optimized inference engine
 */
export async function runInferenceExample(): Promise<void> {
    console.log('Starting inference optimization example...');

    // Create inference configuration
    const config: InferenceConfig = {
        modelPath: 'https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/5',
        useGPU: true,
        batchSize: 16,
        quantization: {
            quantizationBits: 8,
            quantizeWeights: true
        },
        cacheSize: 100,
        optimizeSystem: true
    };

    // Create and initialize the inference engine
    const engine = new ImageClassificationEngine(config);
    const initialized = await engine.initialize();

    if (!initialized) {
        console.error('Failed to initialize inference engine');
        return;
    }

    // Example single inference
    try {
        const input: ImageInput = {
            url: 'https://example.com/cat.jpg',
            width: 224,
            height: 224
        };

        console.log('Running single inference...');
        const result = await engine.predict(input);

        console.log('Inference result:', result.result);
        console.log('Performance metrics:', result.metrics);
    } catch (error) {
        console.error('Inference failed:', error);
    }

    // Example batch inference
    try {
        const inputs: ImageInput[] = [
            { url: 'https://example.com/cat1.jpg', width: 224, height: 224 },
            { url: 'https://example.com/cat2.jpg', width: 224, height: 224 },
            { url: 'https://example.com/dog1.jpg', width: 224, height: 224 },
            { url: 'https://example.com/dog2.jpg', width: 224, height: 224 }
        ];

        console.log('Running batch inference...');
        const results = await engine.predictBatch(inputs);

        console.log(`Processed ${results.length} images`);

        // Calculate average inference time
        const avgInferenceTime = results.reduce((sum, r) => sum + r.metrics.inferenceTimeMs, 0) / results.length;
        console.log(`Average inference time: ${avgInferenceTime.toFixed(2)} ms`);
    } catch (error) {
        console.error('Batch inference failed:', error);
    }

    // Clean up resources
    engine.dispose();
    console.log('Inference example completed');
}

/**
 * Example function demonstrating how to benchmark inference performance
 * @param iterations Number of iterations to run
 * @param batchSizes Array of batch sizes to test
 */
export async function benchmarkInference(
    iterations: number = 10,
    batchSizes: number[] = [1, 4, 8, 16, 32]
): Promise<void> {
    console.log('Starting inference benchmark...');

    // Create a sample image
    const sampleImage: ImageInput = {
        url: 'https://example.com/sample.jpg',
        width: 224,
        height: 224
    };

    // Test different batch sizes
    for (const batchSize of batchSizes) {
        console.log(`\nTesting batch size: ${batchSize}`);

        // Create inference configuration
        const config: InferenceConfig = {
            modelPath: 'https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/classification/5',
            useGPU: true,
            batchSize,
            quantization: {
                quantizationBits: 8,
                quantizeWeights: true
            }
        };

        // Create and initialize the inference engine
        const engine = new ImageClassificationEngine(config);
        await engine.initialize();

        // Create batch of identical images for testing
        const batch = Array(batchSize).fill(sampleImage);

        // Warm-up run
        await engine.predictBatch(batch);

        // Benchmark runs
        const times: number[] = [];

        for (let i = 0; i < iterations; i++) {
            const startTime = performance.now();
            await engine.predictBatch(batch);
            const endTime = performance.now();
            times.push(endTime - startTime);
        }

        // Calculate statistics
        const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const stdDev = Math.sqrt(
            times.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / times.length
        );

        // Calculate throughput (images per second)
        const throughput = (batchSize * 1000) / avgTime;

        console.log(`Results for batch size ${batchSize}:`);
        console.log(`  Average time: ${avgTime.toFixed(2)} ms`);
        console.log(`  Min time: ${minTime.toFixed(2)} ms`);
        console.log(`  Max time: ${maxTime.toFixed(2)} ms`);
        console.log(`  Standard deviation: ${stdDev.toFixed(2)} ms`);
        console.log(`  Throughput: ${throughput.toFixed(2)} images/sec`);

        // Clean up resources
        engine.dispose();
    }

    console.log('\nBenchmark completed');
} 