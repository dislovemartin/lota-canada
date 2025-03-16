/**
 * Comprehensive Benchmarking Utility for Inference Optimization
 */

import * as tf from '@tensorflow/tfjs';
import { ImageClassificationInput, OptimizedImageClassifier } from './image-classification';
import { InferenceConfig } from './inference';
import { OptimizedTextClassifier, TextClassificationInput } from './text-classification';

/**
 * Benchmark configuration options
 */
export interface BenchmarkConfig {
    modelPath: string;
    iterations: number;
    warmupIterations: number;
    batchSizes: number[];
    useGPU: boolean;
    quantizationBits?: 8 | 16 | 32;
    cacheEnabled?: boolean;
    cacheSize?: number;
}

/**
 * Benchmark result for a specific configuration
 */
export interface BenchmarkResult {
    batchSize: number;
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
    stdDevMs: number;
    throughputItemsPerSec: number;
    memoryUsageMB: number;
    gpuMemoryUsageMB?: number;
    quantizationBits?: number;
    backendType: string;
}

/**
 * Benchmark summary with all results
 */
export interface BenchmarkSummary {
    modelPath: string;
    iterations: number;
    warmupIterations: number;
    useGPU: boolean;
    bestConfiguration: {
        batchSize: number;
        throughputItemsPerSec: number;
        avgTimeMs: number;
        quantizationBits?: number;
    };
    results: BenchmarkResult[];
    timestamp: string;
    deviceInfo: {
        platform: string;
        cpuCores?: number;
        gpuInfo?: string;
        memoryMB?: number;
    };
}

/**
 * Get memory usage information
 * @returns Memory usage in MB
 */
function getMemoryUsage(): number {
    if (typeof window !== 'undefined') {
        // Browser environment
        return performance?.memory?.usedJSHeapSize
            ? performance.memory.usedJSHeapSize / (1024 * 1024)
            : 0;
    } else {
        // Node.js environment
        const memoryUsage = process.memoryUsage();
        return memoryUsage.heapUsed / (1024 * 1024);
    }
}

/**
 * Get GPU memory usage if available
 * @returns GPU memory usage in MB or undefined if not available
 */
async function getGPUMemoryUsage(): Promise<number | undefined> {
    if (tf.getBackend() === 'webgl' || tf.getBackend() === 'cuda') {
        try {
            // For WebGL backend
            if (tf.getBackend() === 'webgl') {
                const webglMemoryInfo = (tf.backend() as any).getMemoryInfo?.();
                if (webglMemoryInfo) {
                    return webglMemoryInfo.numBytesInGPU / (1024 * 1024);
                }
            }

            // For CUDA backend (Node.js)
            if (tf.getBackend() === 'cuda' && typeof window === 'undefined') {
                const { exec } = require('child_process');
                return new Promise((resolve) => {
                    exec('nvidia-smi --query-gpu=memory.used --format=csv,noheader,nounits', (error: any, stdout: string) => {
                        if (error) {
                            resolve(undefined);
                        } else {
                            const memoryUsed = parseInt(stdout.trim(), 10);
                            resolve(isNaN(memoryUsed) ? undefined : memoryUsed);
                        }
                    });
                });
            }
        } catch (error) {
            console.warn('Failed to get GPU memory usage:', error);
        }
    }

    return undefined;
}

/**
 * Get device information
 * @returns Device information
 */
async function getDeviceInfo(): Promise<BenchmarkSummary['deviceInfo']> {
    const info: BenchmarkSummary['deviceInfo'] = {
        platform: typeof window !== 'undefined' ? 'browser' : 'node'
    };

    if (typeof window !== 'undefined') {
        // Browser environment
        info.cpuCores = navigator.hardwareConcurrency;

        // Try to get GPU info from WebGL
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    info.gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                }
            }
        } catch (e) {
            console.warn('Failed to get GPU info:', e);
        }
    } else {
        // Node.js environment
        const os = require('os');
        info.cpuCores = os.cpus().length;
        info.memoryMB = os.totalmem() / (1024 * 1024);

        // Try to get GPU info from nvidia-smi
        try {
            const { execSync } = require('child_process');
            const gpuInfo = execSync('nvidia-smi -L', { encoding: 'utf8' });
            info.gpuInfo = gpuInfo.split('\n')[0].replace('GPU 0: ', '').trim();
        } catch (e) {
            // No NVIDIA GPU or nvidia-smi not available
        }
    }

    return info;
}

/**
 * Benchmark image classification with different configurations
 * @param config Benchmark configuration
 * @param sampleInput Sample input for benchmarking
 * @returns Benchmark summary
 */
export async function benchmarkImageClassification(
    config: BenchmarkConfig,
    sampleInput: ImageClassificationInput
): Promise<BenchmarkSummary> {
    console.log('Starting image classification benchmark...');

    // Set backend based on configuration
    if (config.useGPU) {
        if (typeof window !== 'undefined') {
            await tf.setBackend('webgl');
        } else {
            await tf.setBackend('cuda');
        }
    } else {
        await tf.setBackend('cpu');
    }

    console.log(`Using TensorFlow.js backend: ${tf.getBackend()}`);

    const results: BenchmarkResult[] = [];

    // Test each batch size
    for (const batchSize of config.batchSizes) {
        console.log(`\nBenchmarking batch size: ${batchSize}`);

        // Create inference configuration
        const inferenceConfig: InferenceConfig = {
            modelPath: config.modelPath,
            useGPU: config.useGPU,
            batchSize,
            quantization: config.quantizationBits ? {
                quantizationBits: config.quantizationBits,
                quantizeWeights: true
            } : undefined,
            cacheSize: config.cacheEnabled ? (config.cacheSize || 100) : 0
        };

        // Create and initialize the classifier
        const classifier = new OptimizedImageClassifier(inferenceConfig);
        await classifier.initialize();

        // Create batch of identical inputs for testing
        const batch = Array(batchSize).fill(sampleInput);

        // Warm-up runs
        console.log(`Performing ${config.warmupIterations} warm-up iterations...`);
        for (let i = 0; i < config.warmupIterations; i++) {
            await classifier.predictBatch(batch);
        }

        // Benchmark runs
        console.log(`Running ${config.iterations} benchmark iterations...`);
        const times: number[] = [];

        // Record memory before benchmark
        const memoryBefore = getMemoryUsage();
        const gpuMemoryBefore = await getGPUMemoryUsage();

        for (let i = 0; i < config.iterations; i++) {
            const startTime = performance.now();
            await classifier.predictBatch(batch);
            const endTime = performance.now();
            times.push(endTime - startTime);

            // Log progress every 10 iterations
            if ((i + 1) % 10 === 0 || i === config.iterations - 1) {
                console.log(`Completed ${i + 1}/${config.iterations} iterations`);
            }
        }

        // Record memory after benchmark
        const memoryAfter = getMemoryUsage();
        const gpuMemoryAfter = await getGPUMemoryUsage();

        // Calculate memory usage
        const memoryUsageMB = memoryAfter - memoryBefore;
        const gpuMemoryUsageMB = gpuMemoryAfter !== undefined && gpuMemoryBefore !== undefined
            ? gpuMemoryAfter - gpuMemoryBefore
            : undefined;

        // Calculate statistics
        const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const stdDev = Math.sqrt(
            times.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / times.length
        );

        // Calculate throughput (items per second)
        const throughput = (batchSize * 1000) / avgTime;

        // Record result
        const result: BenchmarkResult = {
            batchSize,
            avgTimeMs: avgTime,
            minTimeMs: minTime,
            maxTimeMs: maxTime,
            stdDevMs: stdDev,
            throughputItemsPerSec: throughput,
            memoryUsageMB,
            gpuMemoryUsageMB,
            quantizationBits: config.quantizationBits,
            backendType: tf.getBackend() || 'unknown'
        };

        results.push(result);

        // Log result
        console.log(`Results for batch size ${batchSize}:`);
        console.log(`  Average time: ${avgTime.toFixed(2)} ms`);
        console.log(`  Min time: ${minTime.toFixed(2)} ms`);
        console.log(`  Max time: ${maxTime.toFixed(2)} ms`);
        console.log(`  Standard deviation: ${stdDev.toFixed(2)} ms`);
        console.log(`  Throughput: ${throughput.toFixed(2)} images/sec`);
        console.log(`  Memory usage: ${memoryUsageMB.toFixed(2)} MB`);
        if (gpuMemoryUsageMB !== undefined) {
            console.log(`  GPU memory usage: ${gpuMemoryUsageMB.toFixed(2)} MB`);
        }

        // Clean up resources
        classifier.dispose();

        // Force garbage collection if available
        if (global.gc) {
            global.gc();
        }
    }

    // Find best configuration based on throughput
    const bestResult = results.reduce((best, current) => {
        return current.throughputItemsPerSec > best.throughputItemsPerSec ? current : best;
    }, results[0]);

    // Create summary
    const summary: BenchmarkSummary = {
        modelPath: config.modelPath,
        iterations: config.iterations,
        warmupIterations: config.warmupIterations,
        useGPU: config.useGPU,
        bestConfiguration: {
            batchSize: bestResult.batchSize,
            throughputItemsPerSec: bestResult.throughputItemsPerSec,
            avgTimeMs: bestResult.avgTimeMs,
            quantizationBits: bestResult.quantizationBits
        },
        results,
        timestamp: new Date().toISOString(),
        deviceInfo: await getDeviceInfo()
    };

    console.log('\nBenchmark completed');
    console.log('Best configuration:');
    console.log(`  Batch size: ${summary.bestConfiguration.batchSize}`);
    console.log(`  Throughput: ${summary.bestConfiguration.throughputItemsPerSec.toFixed(2)} items/sec`);
    console.log(`  Average time: ${summary.bestConfiguration.avgTimeMs.toFixed(2)} ms`);
    if (summary.bestConfiguration.quantizationBits) {
        console.log(`  Quantization: ${summary.bestConfiguration.quantizationBits} bits`);
    }

    return summary;
}

/**
 * Benchmark text classification with different configurations
 * @param config Benchmark configuration
 * @param sampleInput Sample input for benchmarking
 * @returns Benchmark summary
 */
export async function benchmarkTextClassification(
    config: BenchmarkConfig,
    sampleInput: TextClassificationInput
): Promise<BenchmarkSummary> {
    console.log('Starting text classification benchmark...');

    // Set backend based on configuration
    if (config.useGPU) {
        if (typeof window !== 'undefined') {
            await tf.setBackend('webgl');
        } else {
            await tf.setBackend('cuda');
        }
    } else {
        await tf.setBackend('cpu');
    }

    console.log(`Using TensorFlow.js backend: ${tf.getBackend()}`);

    const results: BenchmarkResult[] = [];

    // Test each batch size
    for (const batchSize of config.batchSizes) {
        console.log(`\nBenchmarking batch size: ${batchSize}`);

        // Create inference configuration
        const inferenceConfig: InferenceConfig = {
            modelPath: config.modelPath,
            useGPU: config.useGPU,
            batchSize,
            quantization: config.quantizationBits ? {
                quantizationBits: config.quantizationBits,
                quantizeWeights: true
            } : undefined,
            cacheSize: config.cacheEnabled ? (config.cacheSize || 100) : 0
        };

        // Create and initialize the classifier
        const classifier = new OptimizedTextClassifier(inferenceConfig, {
            vocabulary: new Map(), // Empty vocabulary for benchmarking
            classLabels: ['negative', 'positive']
        });
        await classifier.initialize();

        // Create batch of identical inputs for testing
        const batch = Array(batchSize).fill(sampleInput);

        // Warm-up runs
        console.log(`Performing ${config.warmupIterations} warm-up iterations...`);
        for (let i = 0; i < config.warmupIterations; i++) {
            await classifier.predictBatch(batch);
        }

        // Benchmark runs
        console.log(`Running ${config.iterations} benchmark iterations...`);
        const times: number[] = [];

        // Record memory before benchmark
        const memoryBefore = getMemoryUsage();
        const gpuMemoryBefore = await getGPUMemoryUsage();

        for (let i = 0; i < config.iterations; i++) {
            const startTime = performance.now();
            await classifier.predictBatch(batch);
            const endTime = performance.now();
            times.push(endTime - startTime);

            // Log progress every 10 iterations
            if ((i + 1) % 10 === 0 || i === config.iterations - 1) {
                console.log(`Completed ${i + 1}/${config.iterations} iterations`);
            }
        }

        // Record memory after benchmark
        const memoryAfter = getMemoryUsage();
        const gpuMemoryAfter = await getGPUMemoryUsage();

        // Calculate memory usage
        const memoryUsageMB = memoryAfter - memoryBefore;
        const gpuMemoryUsageMB = gpuMemoryAfter !== undefined && gpuMemoryBefore !== undefined
            ? gpuMemoryAfter - gpuMemoryBefore
            : undefined;

        // Calculate statistics
        const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const stdDev = Math.sqrt(
            times.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / times.length
        );

        // Calculate throughput (items per second)
        const throughput = (batchSize * 1000) / avgTime;

        // Record result
        const result: BenchmarkResult = {
            batchSize,
            avgTimeMs: avgTime,
            minTimeMs: minTime,
            maxTimeMs: maxTime,
            stdDevMs: stdDev,
            throughputItemsPerSec: throughput,
            memoryUsageMB,
            gpuMemoryUsageMB,
            quantizationBits: config.quantizationBits,
            backendType: tf.getBackend() || 'unknown'
        };

        results.push(result);

        // Log result
        console.log(`Results for batch size ${batchSize}:`);
        console.log(`  Average time: ${avgTime.toFixed(2)} ms`);
        console.log(`  Min time: ${minTime.toFixed(2)} ms`);
        console.log(`  Max time: ${maxTime.toFixed(2)} ms`);
        console.log(`  Standard deviation: ${stdDev.toFixed(2)} ms`);
        console.log(`  Throughput: ${throughput.toFixed(2)} texts/sec`);
        console.log(`  Memory usage: ${memoryUsageMB.toFixed(2)} MB`);
        if (gpuMemoryUsageMB !== undefined) {
            console.log(`  GPU memory usage: ${gpuMemoryUsageMB.toFixed(2)} MB`);
        }

        // Clean up resources
        classifier.dispose();

        // Force garbage collection if available
        if (global.gc) {
            global.gc();
        }
    }

    // Find best configuration based on throughput
    const bestResult = results.reduce((best, current) => {
        return current.throughputItemsPerSec > best.throughputItemsPerSec ? current : best;
    }, results[0]);

    // Create summary
    const summary: BenchmarkSummary = {
        modelPath: config.modelPath,
        iterations: config.iterations,
        warmupIterations: config.warmupIterations,
        useGPU: config.useGPU,
        bestConfiguration: {
            batchSize: bestResult.batchSize,
            throughputItemsPerSec: bestResult.throughputItemsPerSec,
            avgTimeMs: bestResult.avgTimeMs,
            quantizationBits: bestResult.quantizationBits
        },
        results,
        timestamp: new Date().toISOString(),
        deviceInfo: await getDeviceInfo()
    };

    console.log('\nBenchmark completed');
    console.log('Best configuration:');
    console.log(`  Batch size: ${summary.bestConfiguration.batchSize}`);
    console.log(`  Throughput: ${summary.bestConfiguration.throughputItemsPerSec.toFixed(2)} items/sec`);
    console.log(`  Average time: ${summary.bestConfiguration.avgTimeMs.toFixed(2)} ms`);
    if (summary.bestConfiguration.quantizationBits) {
        console.log(`  Quantization: ${summary.bestConfiguration.quantizationBits} bits`);
    }

    return summary;
}

/**
 * Save benchmark results to a file (Node.js environment)
 * @param summary Benchmark summary
 * @param filePath Output file path
 */
export async function saveBenchmarkResults(summary: BenchmarkSummary, filePath: string): Promise<void> {
    if (typeof window !== 'undefined') {
        throw new Error('saveBenchmarkResults is only available in Node.js environment');
    }

    const fs = require('fs');
    fs.writeFileSync(filePath, JSON.stringify(summary, null, 2), 'utf8');
    console.log(`Benchmark results saved to ${filePath}`);
} 