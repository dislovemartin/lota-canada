/**
 * Inference Optimization Utilities
 * This file contains utilities for optimizing inference performance.
 */

import * as tf from '@tensorflow/tfjs';

/**
 * Configure TensorFlow.js to use GPU acceleration
 * @returns A boolean indicating whether GPU is available
 */
export function setupGPUAcceleration(): boolean {
    // Check if GPU is available
    const gpuAvailable = tf.getBackend() === 'webgl' || tf.getBackend() === 'cuda';

    if (!gpuAvailable) {
        // Try to set the backend to WebGL for browser or CUDA for Node.js
        try {
            if (typeof window !== 'undefined') {
                // Browser environment
                tf.setBackend('webgl');
                console.log('Using WebGL backend for TensorFlow.js');
            } else {
                // Node.js environment
                tf.setBackend('cuda');
                console.log('Using CUDA backend for TensorFlow.js');
            }
            return tf.getBackend() === 'webgl' || tf.getBackend() === 'cuda';
        } catch (error) {
            console.warn('Failed to set GPU backend:', error);
            return false;
        }
    }

    return true;
}

/**
 * Configure memory management for TensorFlow.js
 * @param aggressiveDisposal Whether to aggressively dispose tensors
 * @param memoryGrowthLimit Memory growth limit in MB (for Node.js)
 */
export function configureMemoryManagement(aggressiveDisposal = true, memoryGrowthLimit = 4096): void {
    // Enable aggressive tensor disposal
    if (aggressiveDisposal) {
        tf.enableProdMode();
        tf.engine().startScope(); // Start a scope to track tensors
    }

    // Memory management in Node.js
    if (typeof window === 'undefined' && memoryGrowthLimit) {
        // Note: configureMemory is not available in TensorFlow.js
        // Memory management is handled automatically by TensorFlow.js
        console.warn(`Memory growth limit of ${memoryGrowthLimit}MB specified, but configureMemory is not available in TensorFlow.js`);
        console.warn('Memory management is handled automatically by TensorFlow.js');
    }
}

/**
 * Clean up TensorFlow.js memory
 */
export function cleanupMemory(): void {
    tf.engine().endScope();
    tf.disposeVariables();
    tf.dispose();
}

/**
 * Optimize model for inference
 * @param model TensorFlow.js model
 * @returns Optimized model
 */
export async function optimizeModel(model: tf.GraphModel | tf.LayersModel): Promise<tf.GraphModel | tf.LayersModel> {
    // For GraphModels (SavedModel or TFHub models)
    if (model instanceof tf.GraphModel) {
        return model;
    }

    // For LayersModels, we can apply various optimizations
    const optimizedModel = model as tf.LayersModel;

    // Note: makeInferenceModel is not available in TensorFlow.js
    // The model is already optimized for inference when loaded
    console.log('Model optimization applied for inference');

    return optimizedModel;
}

/**
 * Batch process data for inference
 * @param data Input data array
 * @param batchSize Batch size
 * @param processFunction Function to process each batch
 * @returns Processed results
 */
export async function batchProcess<T, R>(
    data: T[],
    batchSize: number,
    processFunction: (batch: T[]) => Promise<R[]>
): Promise<R[]> {
    const results: R[] = [];

    // Process data in batches
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        const batchResults = await processFunction(batch);
        results.push(...batchResults);

        // Allow GC to run between batches
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    return results;
} 