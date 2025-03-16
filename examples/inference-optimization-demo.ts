/**
 * Comprehensive example demonstrating the use of all inference optimization components
 * This example shows how to:
 * 1. Configure and use the optimized image classifier
 * 2. Configure and use the optimized text classifier
 * 3. Run benchmarks to find optimal configurations
 * 4. Monitor performance during inference
 * 5. Apply system optimizations
 */

import * as tf from '@tensorflow/tfjs';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import {
    benchmarkImageClassification,
    benchmarkTextClassification,
    getDeviceInfo
} from '../lib/benchmark';
import { OptimizedImageClassifier } from '../lib/image-classification';
import { PerformanceMonitor } from '../lib/performance-monitor';
import { OptimizedTextClassifier } from '../lib/text-classification';

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor({
    maxMetricsCount: 1000,
    alertConfig: {
        maxInferenceTimeMs: 100,
        maxMemoryUsageMB: 1000,
        maxGpuMemoryUsageMB: 2000
    }
});

// Path to models
const IMAGE_MODEL_PATH = 'path/to/image/model';
const TEXT_MODEL_PATH = 'path/to/text/model';

// Sample data
const sampleImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg'
];

const sampleTexts = [
    'This is a positive review of the product',
    'I did not like this service at all'
];

// Function to run system optimizations
async function runSystemOptimizations() {
    console.log('Running system optimizations...');

    const scriptPath = path.join(__dirname, '../scripts/run-system-optimizations.js');

    if (fs.existsSync(scriptPath)) {
        const node = spawn('node', [scriptPath], {
            stdio: 'inherit'
        });

        return new Promise<void>((resolve, reject) => {
            node.on('close', (code) => {
                if (code === 0) {
                    console.log('System optimization script completed');
                    resolve();
                } else {
                    console.error(`System optimization script failed with code ${code}`);
                    reject(new Error(`Script failed with code ${code}`));
                }
            });
        });
    } else {
        console.warn(`System optimization script not found at ${scriptPath}`);
        return Promise.resolve();
    }
}

// Function to demonstrate image classification
async function demonstrateImageClassification() {
    console.log('\n=== Image Classification Demonstration ===');

    // Initialize the classifier with optimizations
    const imageClassifier = new OptimizedImageClassifier({
        modelPath: IMAGE_MODEL_PATH,
        imageSize: 224,
        topK: 5,
        useGPU: true,
        quantizationBits: 8,
        enableCaching: true,
        cacheSize: 100,
        batchSize: 4
    });

    try {
        // Load the model
        console.log('Loading image classification model...');
        await imageClassifier.loadModel();
        console.log('Model loaded successfully');

        // Classify images
        console.log('Classifying sample images...');
        for (const imageUrl of sampleImages) {
            // Start recording metrics
            performanceMonitor.startRecording();

            // Classify image
            const result = await imageClassifier.classifyImageFromUrl(imageUrl);

            // Stop recording and get metrics
            const metrics = performanceMonitor.stopRecording();

            // Log results
            console.log(`\nImage: ${imageUrl}`);
            console.log('Top predictions:');
            result.predictions.forEach((pred, i) => {
                console.log(`  ${i + 1}. ${pred.className} (${(pred.probability * 100).toFixed(2)}%)`);
            });

            // Log performance metrics
            console.log('Performance metrics:');
            console.log(`  Inference time: ${metrics.inferenceTimeMs.toFixed(2)} ms`);
            console.log(`  Preprocessing time: ${metrics.preprocessingTimeMs?.toFixed(2) || 'N/A'} ms`);
            console.log(`  Postprocessing time: ${metrics.postprocessingTimeMs?.toFixed(2) || 'N/A'} ms`);
            console.log(`  Total time: ${metrics.totalTimeMs?.toFixed(2) || 'N/A'} ms`);
            console.log(`  Memory usage: ${metrics.memoryUsageMB.toFixed(2)} MB`);
            if (metrics.gpuMemoryUsageMB) {
                console.log(`  GPU memory usage: ${metrics.gpuMemoryUsageMB.toFixed(2)} MB`);
            }
        }
    } catch (error) {
        console.error('Error in image classification demonstration:', error);
    } finally {
        // Dispose of the model to free memory
        await imageClassifier.dispose();
    }
}

// Function to demonstrate text classification
async function demonstrateTextClassification() {
    console.log('\n=== Text Classification Demonstration ===');

    // Initialize the classifier with optimizations
    const textClassifier = new OptimizedTextClassifier({
        modelPath: TEXT_MODEL_PATH,
        maxLength: 128,
        classLabels: ['positive', 'negative', 'neutral'],
        topK: 3,
        useGPU: true,
        quantizationBits: 8,
        enableCaching: true,
        cacheSize: 100,
        batchSize: 8
    });

    try {
        // Load the model
        console.log('Loading text classification model...');
        await textClassifier.loadModel();
        console.log('Model loaded successfully');

        // Classify texts
        console.log('Classifying sample texts...');
        for (const text of sampleTexts) {
            // Start recording metrics
            performanceMonitor.startRecording();

            // Classify text
            const result = await textClassifier.classifyText(text);

            // Stop recording and get metrics
            const metrics = performanceMonitor.stopRecording();

            // Log results
            console.log(`\nText: "${text}"`);
            console.log('Predictions:');
            result.predictions.forEach((pred, i) => {
                console.log(`  ${i + 1}. ${pred.className} (${(pred.probability * 100).toFixed(2)}%)`);
            });

            // Log performance metrics
            console.log('Performance metrics:');
            console.log(`  Inference time: ${metrics.inferenceTimeMs.toFixed(2)} ms`);
            console.log(`  Preprocessing time: ${metrics.preprocessingTimeMs?.toFixed(2) || 'N/A'} ms`);
            console.log(`  Postprocessing time: ${metrics.postprocessingTimeMs?.toFixed(2) || 'N/A'} ms`);
            console.log(`  Total time: ${metrics.totalTimeMs?.toFixed(2) || 'N/A'} ms`);
            console.log(`  Memory usage: ${metrics.memoryUsageMB.toFixed(2)} MB`);
            if (metrics.gpuMemoryUsageMB) {
                console.log(`  GPU memory usage: ${metrics.gpuMemoryUsageMB.toFixed(2)} MB`);
            }
        }
    } catch (error) {
        console.error('Error in text classification demonstration:', error);
    } finally {
        // Dispose of the model to free memory
        await textClassifier.dispose();
    }
}

// Function to run benchmarks
async function runBenchmarks() {
    console.log('\n=== Running Benchmarks ===');

    // Get device information
    const deviceInfo = await getDeviceInfo();
    console.log('Device information:');
    console.log(JSON.stringify(deviceInfo, null, 2));

    // Benchmark configurations
    const batchSizes = [1, 2, 4, 8, 16];
    const iterations = 20;
    const warmupIterations = 5;

    // Benchmark image classification
    console.log('\nBenchmarking image classification...');
    const imageResults = await benchmarkImageClassification({
        modelPath: IMAGE_MODEL_PATH,
        iterations,
        warmupIterations,
        batchSizes,
        useGPU: true,
        quantizationBits: 8,
        cacheEnabled: true,
        cacheSize: 100
    });

    console.log('Image classification benchmark results:');
    console.log(JSON.stringify(imageResults, null, 2));

    // Benchmark text classification
    console.log('\nBenchmarking text classification...');
    const textResults = await benchmarkTextClassification({
        modelPath: TEXT_MODEL_PATH,
        iterations,
        warmupIterations,
        batchSizes,
        useGPU: true,
        quantizationBits: 8,
        cacheEnabled: true,
        cacheSize: 100
    });

    console.log('Text classification benchmark results:');
    console.log(JSON.stringify(textResults, null, 2));

    // Save benchmark results
    const resultsDir = path.join(__dirname, '../benchmark-results');
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    fs.writeFileSync(
        path.join(resultsDir, `image-benchmark-${new Date().toISOString().replace(/:/g, '-')}.json`),
        JSON.stringify(imageResults, null, 2)
    );

    fs.writeFileSync(
        path.join(resultsDir, `text-benchmark-${new Date().toISOString().replace(/:/g, '-')}.json`),
        JSON.stringify(textResults, null, 2)
    );

    console.log(`Benchmark results saved to ${resultsDir}`);
}

// Function to analyze performance data
function analyzePerformanceData() {
    console.log('\n=== Performance Analysis ===');

    // Calculate statistics
    const stats = performanceMonitor.calculateStatistics();

    console.log('Performance statistics:');
    console.log(JSON.stringify(stats, null, 2));

    // Check for alerts
    const alerts = performanceMonitor.getAlerts();
    if (alerts.length > 0) {
        console.log('\nPerformance alerts:');
        alerts.forEach((alert, i) => {
            console.log(`Alert ${i + 1}: ${alert.message} (${new Date(alert.timestamp).toLocaleString()})`);
        });
    } else {
        console.log('\nNo performance alerts detected');
    }

    // Save performance data
    const dataDir = path.join(__dirname, '../performance-data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const filename = path.join(dataDir, `performance-${new Date().toISOString().replace(/:/g, '-')}.json`);
    performanceMonitor.saveToFile(filename);
    console.log(`Performance data saved to ${filename}`);
}

// Main function
async function main() {
    try {
        console.log('Starting inference optimization demonstration');

        // Check if TensorFlow.js is using GPU
        const backend = tf.getBackend();
        console.log(`TensorFlow.js backend: ${backend}`);

        if (backend !== 'webgl' && backend !== 'cuda') {
            console.log('Attempting to set GPU backend...');
            try {
                await tf.setBackend('webgl');
                console.log(`Backend set to: ${tf.getBackend()}`);
            } catch (error) {
                console.warn('Could not set WebGL backend:', error);
                console.log('Continuing with CPU backend');
            }
        }

        // Run system optimizations
        await runSystemOptimizations();

        // Run demonstrations
        await demonstrateImageClassification();
        await demonstrateTextClassification();

        // Run benchmarks
        await runBenchmarks();

        // Analyze performance data
        analyzePerformanceData();

        console.log('\nInference optimization demonstration completed');
    } catch (error) {
        console.error('Error in inference optimization demonstration:', error);
    } finally {
        // Clean up
        performanceMonitor.clear();
        tf.disposeVariables();
    }
}

// Run the main function
if (require.main === module) {
    main().catch(console.error);
}

// Export functions for use in other modules
export {
    analyzePerformanceData, demonstrateImageClassification,
    demonstrateTextClassification,
    runBenchmarks
};
