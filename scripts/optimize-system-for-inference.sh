#!/bin/bash
#
# System Optimization Script for ML Inference
# This script optimizes system settings for machine learning inference.
#

set -e

# Print section header
print_header() {
  echo
  echo "===== $1 ====="
  echo
}

# Check if running as root
check_root() {
  if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root. Please use sudo."
    exit 1
  fi
}

# Optimize CPU settings
optimize_cpu() {
  print_header "Optimizing CPU settings"
  
  # Get number of CPU cores
  NUM_CORES=$(nproc)
  echo "Detected $NUM_CORES CPU cores"
  
  # Set CPU governor to performance
  if [ -d /sys/devices/system/cpu/cpu0/cpufreq ]; then
    echo "Setting CPU governor to performance mode"
    for i in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
      echo "performance" > "$i" 2>/dev/null || echo "Failed to set governor for $i (may require root)"
    done
  else
    echo "CPU frequency scaling not available"
  fi
  
  # Disable CPU throttling
  echo "Disabling CPU throttling"
  for i in /sys/devices/system/cpu/cpu*/power/energy_perf_bias; do
    echo "performance" > "$i" 2>/dev/null || echo "Failed to set energy_perf_bias for $i (may require root)"
  done
  
  # Set process scheduling priority
  echo "Setting process scheduling priority"
  echo -1 > /proc/sys/kernel/sched_rt_runtime_us 2>/dev/null || echo "Failed to set sched_rt_runtime_us (may require root)"
  
  echo "CPU optimization completed"
}

# Optimize memory settings
optimize_memory() {
  print_header "Optimizing memory settings"
  
  # Get total system memory in kB
  TOTAL_MEM=$(grep MemTotal /proc/meminfo | awk '{print $2}')
  TOTAL_MEM_GB=$(echo "scale=2; $TOTAL_MEM/1024/1024" | bc)
  echo "Detected $TOTAL_MEM_GB GB of system memory"
  
  # Set swappiness to reduce swapping
  echo "Setting swappiness to 10 to reduce swapping"
  echo 10 > /proc/sys/vm/swappiness 2>/dev/null || echo "Failed to set swappiness (may require root)"
  
  # Set min free kbytes to ensure some memory is always available
  MIN_FREE_KB=$(echo "$TOTAL_MEM / 100" | bc)
  echo "Setting min_free_kbytes to $MIN_FREE_KB"
  echo $MIN_FREE_KB > /proc/sys/vm/min_free_kbytes 2>/dev/null || echo "Failed to set min_free_kbytes (may require root)"
  
  # Disable transparent huge pages
  echo "Disabling transparent huge pages"
  echo never > /sys/kernel/mm/transparent_hugepage/enabled 2>/dev/null || echo "Failed to disable transparent huge pages (may require root)"
  
  # Set vm.dirty_ratio and vm.dirty_background_ratio
  echo "Setting vm.dirty_ratio to 80"
  echo 80 > /proc/sys/vm/dirty_ratio 2>/dev/null || echo "Failed to set dirty_ratio (may require root)"
  
  echo "Setting vm.dirty_background_ratio to 5"
  echo 5 > /proc/sys/vm/dirty_background_ratio 2>/dev/null || echo "Failed to set dirty_background_ratio (may require root)"
  
  echo "Memory optimization completed"
}

# Optimize I/O settings
optimize_io() {
  print_header "Optimizing I/O settings"
  
  # Set I/O scheduler to deadline for SSDs or noop for NVMe
  echo "Setting I/O scheduler"
  for DEVICE in /sys/block/sd*; do
    if [ -d "$DEVICE" ]; then
      SCHEDULER_FILE="$DEVICE/queue/scheduler"
      if [ -f "$SCHEDULER_FILE" ]; then
        echo "deadline" > "$SCHEDULER_FILE" 2>/dev/null || echo "Failed to set scheduler for $DEVICE (may require root)"
      fi
    fi
  done
  
  for DEVICE in /sys/block/nvme*; do
    if [ -d "$DEVICE" ]; then
      SCHEDULER_FILE="$DEVICE/queue/scheduler"
      if [ -f "$SCHEDULER_FILE" ]; then
        echo "none" > "$SCHEDULER_FILE" 2>/dev/null || echo "Failed to set scheduler for $DEVICE (may require root)"
      fi
    fi
  done
  
  # Increase read-ahead buffer
  echo "Increasing read-ahead buffer"
  for DEVICE in /sys/block/sd* /sys/block/nvme*; do
    if [ -d "$DEVICE" ]; then
      READ_AHEAD_FILE="$DEVICE/queue/read_ahead_kb"
      if [ -f "$READ_AHEAD_FILE" ]; then
        echo 4096 > "$READ_AHEAD_FILE" 2>/dev/null || echo "Failed to set read_ahead_kb for $DEVICE (may require root)"
      fi
    fi
  done
  
  echo "I/O optimization completed"
}

# Optimize network settings
optimize_network() {
  print_header "Optimizing network settings"
  
  # Increase TCP buffer sizes
  echo "Increasing TCP buffer sizes"
  echo 16777216 > /proc/sys/net/core/rmem_max 2>/dev/null || echo "Failed to set rmem_max (may require root)"
  echo 16777216 > /proc/sys/net/core/wmem_max 2>/dev/null || echo "Failed to set wmem_max (may require root)"
  echo 4096 87380 16777216 > /proc/sys/net/ipv4/tcp_rmem 2>/dev/null || echo "Failed to set tcp_rmem (may require root)"
  echo 4096 65536 16777216 > /proc/sys/net/ipv4/tcp_wmem 2>/dev/null || echo "Failed to set tcp_wmem (may require root)"
  
  # Enable TCP fast open
  echo "Enabling TCP fast open"
  echo 3 > /proc/sys/net/ipv4/tcp_fastopen 2>/dev/null || echo "Failed to enable TCP fast open (may require root)"
  
  # Increase maximum number of connections
  echo "Increasing maximum number of connections"
  echo 65536 > /proc/sys/net/core/somaxconn 2>/dev/null || echo "Failed to set somaxconn (may require root)"
  echo 65536 > /proc/sys/net/ipv4/tcp_max_syn_backlog 2>/dev/null || echo "Failed to set tcp_max_syn_backlog (may require root)"
  
  echo "Network optimization completed"
}

# Optimize GPU settings (NVIDIA)
optimize_nvidia_gpu() {
  print_header "Optimizing NVIDIA GPU settings"
  
  # Check if nvidia-smi is available
  if command -v nvidia-smi &> /dev/null; then
    echo "NVIDIA GPU detected"
    
    # Set persistence mode
    echo "Setting persistence mode"
    nvidia-smi -pm 1 || echo "Failed to set persistence mode (may require root)"
    
    # Set GPU clock to maximum performance
    echo "Setting GPU clock to maximum performance"
    nvidia-smi -ac $(nvidia-smi --query-gpu=clocks.max.memory,clocks.max.graphics --format=csv,noheader | head -n 1 | sed 's/,/,/') || echo "Failed to set GPU clock (may require root)"
    
    # Disable auto boost
    echo "Disabling auto boost"
    nvidia-smi --auto-boost-default=0 || echo "Failed to disable auto boost (may require root)"
    
    # Set compute mode to default
    echo "Setting compute mode to default"
    nvidia-smi -c 0 || echo "Failed to set compute mode (may require root)"
    
    echo "NVIDIA GPU optimization completed"
  else
    echo "NVIDIA GPU not detected or nvidia-smi not available"
  fi
}

# Main function
main() {
  print_header "System Optimization for ML Inference"
  
  # Check if running as root
  check_root
  
  # Optimize CPU
  optimize_cpu
  
  # Optimize memory
  optimize_memory
  
  # Optimize I/O
  optimize_io
  
  # Optimize network
  optimize_network
  
  # Optimize NVIDIA GPU
  optimize_nvidia_gpu
  
  print_header "Optimization Completed"
  echo "System has been optimized for ML inference."
  echo "Note: Some settings may revert after system reboot."
  echo "To make these settings permanent, add them to /etc/sysctl.conf or create a systemd service."
}

# Run main function
main 