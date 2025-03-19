declare module '@tensorflow/tfjs-node' {
  import * as tf from '@tensorflow/tfjs';

  export * from '@tensorflow/tfjs';
  
  export namespace node {
    function decodeImage(
      contents: Uint8Array | Buffer,
      channels?: number
    ): tf.Tensor3D;

    function encodePng(
      tensor: tf.Tensor3D,
      compression?: number
    ): Buffer;

    function encodeJpeg(
      tensor: tf.Tensor3D,
      quality?: number
    ): Buffer;

    function createTensorboard(
      logdir: string
    ): void;

    // NVIDIA GPU specific functionality
    interface CudaBackendConfig {
      deviceId?: number;
      memoryGrowthMode?: 'linear' | 'exponential';
      initialMemoryAllocation?: number;
      allowGrowth?: boolean;
      maxMemory?: number;
    }

    function setGPUBackendConfig(config: CudaBackendConfig): void;
    
    function getGPUMemoryInfo(): {
      freeMemory: number;
      totalMemory: number;
      usedMemory: number;
    };

    function enableGPUProfiling(options?: {
      memoryTracing?: boolean;
      kernelTracing?: boolean;
      logDir?: string;
    }): void;

    function disableGPUProfiling(): void;
  }

  // TensorRT optimization
  export interface TensorRTConfig {
    precision: 'FP32' | 'FP16' | 'INT8';
    maxBatchSize: number;
    maxWorkspaceSize: number;
    minTimingIterations: number;
    reportValidationResults?: boolean;
  }

  export function enableTensorRT(config: TensorRTConfig): Promise<void>;
  export function disableTensorRT(): void;
} 