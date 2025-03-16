/**
 * Inference Optimization Utilities
 * This file contains utilities for optimizing inference performance.
 */

import * as tf from 'tensorflow';

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

    // Set memory growth limit for Node.js
    if (typeof window === 'undefined' && memoryGrowthLimit) {
        tf.engine().configureMemory({
            unreliable: false,
            growthFactor: 1.1,
            cap: memoryGrowthLimit * 1024 * 1024, // Convert MB to bytes
        });
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

    // Make the model inference-only (removes training-specific operations)
    await optimizedModel.makeInferenceModel();

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