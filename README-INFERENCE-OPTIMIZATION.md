# Inference Optimization Framework

This framework provides a comprehensive set of tools and utilities for optimizing machine learning inference in both browser and Node.js environments. It focuses on performance optimization for TensorFlow.js models, with a particular emphasis on image and text classification tasks.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
- [Usage Examples](#usage-examples)
- [Benchmarking](#benchmarking)
- [Performance Monitoring](#performance-monitoring)
- [System Optimizations](#system-optimizations)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Installation

To use the inference optimization framework, you need to install TensorFlow.js and its Node.js bindings:

```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-node --legacy-peer-deps
```

For GPU support on Node.js, install the GPU version:

```bash
npm install @tensorflow/tfjs-node-gpu --legacy-peer-deps
```

## Components

The framework consists of the following components:

### 1. Core Inference Engine

- `lib/inference.ts`: Base class for optimized inference engines
- `lib/inference-optimization.ts`: Utilities for GPU acceleration, memory management, and batch processing
- `lib/model-optimization.ts`: Utilities for model quantization, pruning, and caching

### 2. Task-Specific Models

- `lib/image-classification.ts`: Optimized image classification model
- `lib/text-classification.ts`: Optimized text classification model

### 3. Performance Tools

- `lib/benchmark.ts`: Benchmarking utilities for finding optimal configurations
- `lib/performance-monitor.ts`: Real-time performance monitoring and alerting

### 4. System Optimization

- `scripts/optimize-system-for-inference.sh`: Shell script for system-level optimizations
- `scripts/run-system-optimizations.js`: Node.js script to run system optimizations with sudo

## Usage Examples

### Basic Usage

```typescript
import { OptimizedImageClassifier } from './lib/image-classification';

// Initialize the classifier with optimizations
const classifier = new OptimizedImageClassifier({
  modelPath: 'path/to/model',
  imageSize: 224,
  topK: 5,
  useGPU: true,
  quantizationBits: 8,
  enableCaching: true,
  cacheSize: 100,
  batchSize: 4
});

// Load the model
await classifier.loadModel();

// Classify an image
const result = await classifier.classifyImageFromUrl('https://example.com/image.jpg');

// Log results
console.log('Top predictions:');
result.predictions.forEach((pred, i) => {
  console.log(`${i+1}. ${pred.className} (${(pred.probability * 100).toFixed(2)}%)`);
});

// Dispose of the model when done
await classifier.dispose();
```

### Complete Example

See `examples/inference-optimization-demo.ts` for a comprehensive example that demonstrates all components of the framework.

## Benchmarking

The benchmarking utility helps you find the optimal configuration for your specific workload:

```typescript
import { benchmarkImageClassification, getDeviceInfo } from './lib/benchmark';

// Get device information
const deviceInfo = await getDeviceInfo();
console.log('Device information:', deviceInfo);

// Run benchmark with different batch sizes
const results = await benchmarkImageClassification({
  modelPath: 'path/to/model',
  iterations: 20,
  warmupIterations: 5,
  batchSizes: [1, 2, 4, 8, 16],
  useGPU: true,
  quantizationBits: 8,
  cacheEnabled: true,
  cacheSize: 100
});

console.log('Benchmark results:', results);
```

## Performance Monitoring

The performance monitoring utility helps you track inference performance in real-time:

```typescript
import { PerformanceMonitor } from './lib/performance-monitor';

// Initialize performance monitor
const monitor = new PerformanceMonitor({
  maxMetricsCount: 1000,
  alertConfig: {
    maxInferenceTimeMs: 100,
    maxMemoryUsageMB: 1000,
    maxGpuMemoryUsageMB: 2000
  }
});

// Start recording metrics
monitor.startRecording();

// Run inference
// ...

// Stop recording and get metrics
const metrics = monitor.stopRecording();
console.log('Performance metrics:', metrics);

// Calculate statistics
const stats = monitor.calculateStatistics();
console.log('Performance statistics:', stats);

// Check for alerts
const alerts = monitor.getAlerts();
console.log('Performance alerts:', alerts);

// Save performance data to file
monitor.saveToFile('performance-data.json');
```

## System Optimizations

The system optimization script applies various system-level optimizations for improved inference performance:

```bash
# Run the script directly
sudo ./scripts/optimize-system-for-inference.sh

# Or use the Node.js wrapper
node ./scripts/run-system-optimizations.js
```

The script applies the following optimizations:

- CPU governor settings
- Memory management
- I/O scheduler
- Network settings
- NVIDIA GPU settings (if available)

## Best Practices

### Model Optimization

1. **Quantization**: Use 8-bit quantization for most models to reduce memory usage and improve inference speed.
2. **Pruning**: Remove unnecessary weights to reduce model size and improve performance.
3. **Caching**: Enable caching for repeated inferences on the same input.
4. **Batch Processing**: Use batch processing for multiple inputs to maximize throughput.

### Hardware Acceleration

1. **GPU Acceleration**: Enable GPU acceleration when available for significant performance improvements.
2. **WebGL Backend**: In browser environments, use the WebGL backend for GPU acceleration.
3. **CUDA Backend**: In Node.js environments, use the CUDA backend for NVIDIA GPUs.

### Memory Management

1. **Tensor Disposal**: Always dispose of tensors after use to prevent memory leaks.
2. **Model Disposal**: Dispose of models when no longer needed to free GPU memory.
3. **Memory Monitoring**: Use the performance monitor to track memory usage and detect leaks.

## Troubleshooting

### Common Issues

1. **Out of Memory Errors**:
   - Reduce batch size
   - Enable model quantization
   - Dispose of tensors and models properly

2. **Slow Inference**:
   - Check if GPU acceleration is enabled
   - Optimize preprocessing and postprocessing steps
   - Use appropriate batch sizes for your hardware

3. **GPU Not Detected**:
   - Ensure GPU drivers are installed and up to date
   - Check TensorFlow.js backend with `tf.getBackend()`
   - Try setting the backend explicitly with `tf.setBackend('webgl')`

### Debugging

Use the performance monitor to identify bottlenecks:

```typescript
// Get detailed performance metrics
const metrics = monitor.getMetrics();

// Find slow operations
const slowOperations = metrics.filter(m => m.inferenceTimeMs > 100);
console.log('Slow operations:', slowOperations);
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 