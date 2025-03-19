declare module '@tensorflow/tfjs' {
  export interface Tensor {
    dispose(): void;
    shape: number[];
    dtype: string;
    size: number;
    resizeBilinear(newShape: [number, number]): Tensor;
    expandDims(axis?: number): Tensor;
    toFloat(): Tensor;
    div(denominator: number): Tensor;
  }

  export interface Tensor3D extends Tensor {
    shape: [number, number, number];
  }

  export interface Tensor4D extends Tensor {
    shape: [number, number, number, number];
  }

  export interface Memory {
    numBytes: number;
    numTensors: number;
    numDataBuffers: number;
    unreliable?: boolean;
    reasons?: string[];
  }

  export interface Backend {
    getMemoryInfo(): {
      numBytesInGPU: number;
      numBytesInGPUAllocated: number;
      numBytesInGPUFree: number;
      unreliable: boolean;
    };
  }

  export function tensor(values: number[] | number[][] | number[][][], shape?: number[]): Tensor;
  export function tensor3d(values: number[][][], shape?: [number, number, number]): Tensor3D;
  export function tensor4d(values: number[][][][], shape?: [number, number, number, number]): Tensor4D;

  export interface LayersModel {
    predict(inputs: Tensor | Tensor[]): Tensor | Tensor[];
    dispose(): void;
  }

  export function loadLayersModel(path: string): Promise<LayersModel>;
  
  // Backend management
  export function getBackend(): string;
  export function setBackend(backendName: string): Promise<boolean>;
  export function backend(): Backend;
  
  // Memory management
  export function memory(): Memory;
  export function disposeVariables(): void;
  export function tidy<T>(nameOrFn: string | (() => T), fn?: () => T): T;
  
  // Device management
  export function ready(): Promise<void>;
  export function enableProdMode(): void;
  export function enableDebugMode(): void;
  
  // GPU specific
  export const webgl: {
    forceHalfFloat(): void;
    setWebGLContext(webGLVersion: number, gl: WebGLRenderingContext): void;
  };
} 