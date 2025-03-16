/**
 * Performance Monitoring Utility for Inference
 * This utility helps track and analyze inference performance metrics.
 */

import * as tf from '@tensorflow/tfjs';

/**
 * Performance metrics for a single inference operation
 */
export interface InferenceMetrics {
    timestamp: number;
    inferenceTimeMs: number;
    preprocessingTimeMs: number;
    postprocessingTimeMs: number;
    totalTimeMs: number;
    batchSize: number;
    deviceType: string;
    memoryUsageMB: number;
    gpuMemoryUsageMB?: number;
}

/**
 * Performance statistics calculated from multiple metrics
 */
export interface PerformanceStatistics {
    count: number;
    avgInferenceTimeMs: number;
    minInferenceTimeMs: number;
    maxInferenceTimeMs: number;
    p95InferenceTimeMs: number;
    p99InferenceTimeMs: number;
    avgTotalTimeMs: number;
    avgPreprocessingTimeMs: number;
    avgPostprocessingTimeMs: number;
    avgThroughputItemsPerSec: number;
    avgMemoryUsageMB: number;
    avgGpuMemoryUsageMB?: number;
    timeRange: {
        start: number;
        end: number;
        durationMs: number;
    };
}

/**
 * Alert configuration for performance monitoring
 */
export interface AlertConfig {
    maxInferenceTimeMs?: number;
    maxTotalTimeMs?: number;
    maxMemoryUsageMB?: number;
    maxGpuMemoryUsageMB?: number;
    minThroughputItemsPerSec?: number;
}

/**
 * Alert triggered when performance metrics exceed thresholds
 */
export interface PerformanceAlert {
    timestamp: number;
    type: 'inference_time' | 'total_time' | 'memory_usage' | 'gpu_memory_usage' | 'throughput';
    threshold: number;
    actualValue: number;
    metrics: InferenceMetrics;
}

/**
 * Performance monitor for tracking inference metrics
 */
export class PerformanceMonitor {
    private metrics: InferenceMetrics[] = [];
    private alerts: PerformanceAlert[] = [];
    private alertConfig: AlertConfig;
    private maxMetricsCount: number;
    private alertHandlers: ((alert: PerformanceAlert) => void)[] = [];

    /**
     * Create a new performance monitor
     * @param options Configuration options
     */
    constructor(options: {
        maxMetricsCount?: number;
        alertConfig?: AlertConfig;
    } = {}) {
        this.maxMetricsCount = options.maxMetricsCount || 1000;
        this.alertConfig = options.alertConfig || {};
    }

    /**
     * Record inference metrics
     * @param metrics Inference metrics to record
     */
    recordMetrics(metrics: Omit<InferenceMetrics, 'timestamp' | 'memoryUsageMB' | 'gpuMemoryUsageMB'>): void {
        // Add timestamp and memory usage
        const fullMetrics: InferenceMetrics = {
            ...metrics,
            timestamp: Date.now(),
            memoryUsageMB: this.getMemoryUsage()
        };

        // Add GPU memory usage if available
        this.getGPUMemoryUsage().then(gpuMemoryUsageMB => {
            if (gpuMemoryUsageMB !== undefined) {
                fullMetrics.gpuMemoryUsageMB = gpuMemoryUsageMB;
            }

            // Add to metrics array
            this.metrics.push(fullMetrics);

            // Trim metrics array if it exceeds max size
            if (this.metrics.length > this.maxMetricsCount) {
                this.metrics.shift();
            }

            // Check for alerts
            this.checkAlerts(fullMetrics);
        });
    }

    /**
     * Get memory usage information
     * @returns Memory usage in MB
     */
    private getMemoryUsage(): number {
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
    private async getGPUMemoryUsage(): Promise<number | undefined> {
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
     * Check for performance alerts
     * @param metrics Metrics to check
     */
    private checkAlerts(metrics: InferenceMetrics): void {
        const { alertConfig } = this;

        // Check inference time
        if (alertConfig.maxInferenceTimeMs && metrics.inferenceTimeMs > alertConfig.maxInferenceTimeMs) {
            this.triggerAlert({
                timestamp: Date.now(),
                type: 'inference_time',
                threshold: alertConfig.maxInferenceTimeMs,
                actualValue: metrics.inferenceTimeMs,
                metrics
            });
        }

        // Check total time
        if (alertConfig.maxTotalTimeMs && metrics.totalTimeMs > alertConfig.maxTotalTimeMs) {
            this.triggerAlert({
                timestamp: Date.now(),
                type: 'total_time',
                threshold: alertConfig.maxTotalTimeMs,
                actualValue: metrics.totalTimeMs,
                metrics
            });
        }

        // Check memory usage
        if (alertConfig.maxMemoryUsageMB && metrics.memoryUsageMB > alertConfig.maxMemoryUsageMB) {
            this.triggerAlert({
                timestamp: Date.now(),
                type: 'memory_usage',
                threshold: alertConfig.maxMemoryUsageMB,
                actualValue: metrics.memoryUsageMB,
                metrics
            });
        }

        // Check GPU memory usage
        if (alertConfig.maxGpuMemoryUsageMB &&
            metrics.gpuMemoryUsageMB !== undefined &&
            metrics.gpuMemoryUsageMB > alertConfig.maxGpuMemoryUsageMB) {
            this.triggerAlert({
                timestamp: Date.now(),
                type: 'gpu_memory_usage',
                threshold: alertConfig.maxGpuMemoryUsageMB,
                actualValue: metrics.gpuMemoryUsageMB,
                metrics
            });
        }

        // Check throughput
        const throughput = metrics.batchSize * 1000 / metrics.totalTimeMs;
        if (alertConfig.minThroughputItemsPerSec && throughput < alertConfig.minThroughputItemsPerSec) {
            this.triggerAlert({
                timestamp: Date.now(),
                type: 'throughput',
                threshold: alertConfig.minThroughputItemsPerSec,
                actualValue: throughput,
                metrics
            });
        }
    }

    /**
     * Trigger a performance alert
     * @param alert Alert to trigger
     */
    private triggerAlert(alert: PerformanceAlert): void {
        // Add to alerts array
        this.alerts.push(alert);

        // Notify alert handlers
        this.alertHandlers.forEach(handler => {
            try {
                handler(alert);
            } catch (error) {
                console.error('Error in alert handler:', error);
            }
        });

        // Log alert
        console.warn(`Performance alert: ${alert.type} exceeded threshold (${alert.threshold}): ${alert.actualValue}`);
    }

    /**
     * Add an alert handler
     * @param handler Alert handler function
     * @returns Function to remove the handler
     */
    onAlert(handler: (alert: PerformanceAlert) => void): () => void {
        this.alertHandlers.push(handler);

        // Return function to remove the handler
        return () => {
            const index = this.alertHandlers.indexOf(handler);
            if (index !== -1) {
                this.alertHandlers.splice(index, 1);
            }
        };
    }

    /**
     * Get all recorded metrics
     * @returns Array of metrics
     */
    getMetrics(): InferenceMetrics[] {
        return [...this.metrics];
    }

    /**
     * Get all triggered alerts
     * @returns Array of alerts
     */
    getAlerts(): PerformanceAlert[] {
        return [...this.alerts];
    }

    /**
     * Calculate performance statistics from recorded metrics
     * @param timeRangeMs Optional time range in milliseconds (from now)
     * @returns Performance statistics
     */
    calculateStatistics(timeRangeMs?: number): PerformanceStatistics {
        // Filter metrics by time range if specified
        let filteredMetrics = this.metrics;
        if (timeRangeMs) {
            const now = Date.now();
            const startTime = now - timeRangeMs;
            filteredMetrics = this.metrics.filter(m => m.timestamp >= startTime);
        }

        // If no metrics, return empty statistics
        if (filteredMetrics.length === 0) {
            return {
                count: 0,
                avgInferenceTimeMs: 0,
                minInferenceTimeMs: 0,
                maxInferenceTimeMs: 0,
                p95InferenceTimeMs: 0,
                p99InferenceTimeMs: 0,
                avgTotalTimeMs: 0,
                avgPreprocessingTimeMs: 0,
                avgPostprocessingTimeMs: 0,
                avgThroughputItemsPerSec: 0,
                avgMemoryUsageMB: 0,
                timeRange: {
                    start: 0,
                    end: 0,
                    durationMs: 0
                }
            };
        }

        // Calculate time range
        const startTime = Math.min(...filteredMetrics.map(m => m.timestamp));
        const endTime = Math.max(...filteredMetrics.map(m => m.timestamp));

        // Calculate statistics
        const count = filteredMetrics.length;
        const inferenceTimesMs = filteredMetrics.map(m => m.inferenceTimeMs);
        const totalTimesMs = filteredMetrics.map(m => m.totalTimeMs);
        const preprocessingTimesMs = filteredMetrics.map(m => m.preprocessingTimeMs);
        const postprocessingTimesMs = filteredMetrics.map(m => m.postprocessingTimeMs);
        const memoryUsagesMB = filteredMetrics.map(m => m.memoryUsageMB);
        const gpuMemoryUsagesMB = filteredMetrics
            .filter(m => m.gpuMemoryUsageMB !== undefined)
            .map(m => m.gpuMemoryUsageMB!);

        // Calculate throughput for each metric
        const throughputs = filteredMetrics.map(m => (m.batchSize * 1000) / m.totalTimeMs);

        // Sort inference times for percentile calculations
        const sortedInferenceTimesMs = [...inferenceTimesMs].sort((a, b) => a - b);

        // Calculate percentiles
        const p95Index = Math.floor(count * 0.95);
        const p99Index = Math.floor(count * 0.99);

        return {
            count,
            avgInferenceTimeMs: this.calculateAverage(inferenceTimesMs),
            minInferenceTimeMs: Math.min(...inferenceTimesMs),
            maxInferenceTimeMs: Math.max(...inferenceTimesMs),
            p95InferenceTimeMs: sortedInferenceTimesMs[p95Index],
            p99InferenceTimeMs: sortedInferenceTimesMs[p99Index],
            avgTotalTimeMs: this.calculateAverage(totalTimesMs),
            avgPreprocessingTimeMs: this.calculateAverage(preprocessingTimesMs),
            avgPostprocessingTimeMs: this.calculateAverage(postprocessingTimesMs),
            avgThroughputItemsPerSec: this.calculateAverage(throughputs),
            avgMemoryUsageMB: this.calculateAverage(memoryUsagesMB),
            avgGpuMemoryUsageMB: gpuMemoryUsagesMB.length > 0 ? this.calculateAverage(gpuMemoryUsagesMB) : undefined,
            timeRange: {
                start: startTime,
                end: endTime,
                durationMs: endTime - startTime
            }
        };
    }

    /**
     * Calculate average of an array of numbers
     * @param values Array of numbers
     * @returns Average value
     */
    private calculateAverage(values: number[]): number {
        if (values.length === 0) return 0;
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }

    /**
     * Clear all recorded metrics and alerts
     */
    clear(): void {
        this.metrics = [];
        this.alerts = [];
    }

    /**
     * Save performance data to a file (Node.js environment)
     * @param filePath Output file path
     */
    async saveToFile(filePath: string): Promise<void> {
        if (typeof window !== 'undefined') {
            throw new Error('saveToFile is only available in Node.js environment');
        }

        const fs = require('fs');
        const data = {
            metrics: this.metrics,
            alerts: this.alerts,
            statistics: this.calculateStatistics(),
            timestamp: new Date().toISOString()
        };

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Performance data saved to ${filePath}`);
    }

    /**
     * Export performance data as JSON
     * @returns JSON string of performance data
     */
    exportAsJson(): string {
        const data = {
            metrics: this.metrics,
            alerts: this.alerts,
            statistics: this.calculateStatistics(),
            timestamp: new Date().toISOString()
        };

        return JSON.stringify(data, null, 2);
    }
} 