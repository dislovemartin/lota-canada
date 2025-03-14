/**
 * MONAI Deploy Workflow Manager API Client
 * This client provides methods to interact with the MONAI Deploy Workflow Manager API.
 */

// Types for Workflow Manager entities
export interface Workflow {
  id?: string;
  workflow_id?: string;
  revision?: number;
  name: string;
  version: string;
  description: string;
  informatics_gateway: {
    ae_title: string;
    data_origins: string[];
    export_destinations: string[];
  };
  tasks: WorkflowTask[];
}

export interface WorkflowTask {
  id: string;
  description: string;
  type: string;
  args: Record<string, string>;
  ref?: string;
  task_destinations?: string[];
  export_destinations?: string[];
  artifacts?: {
    input?: TaskArtifact[];
    output?: TaskArtifact[];
  };
}

export interface TaskArtifact {
  name: string;
  value: string;
  mandatory: boolean;
}

export interface WorkflowInstance {
  id?: string;
  ae_title?: string;
  workflow_name?: string;
  workflow_id?: string;
  payload_id?: string;
  start_time?: string;
  status?: string;
  bucket_id?: string;
  input_metadata?: Record<string, unknown>;
  tasks?: WorkflowInstanceTask[];
}

export interface WorkflowInstanceTask {
  execution_id?: string;
  workflow_instance_id?: string;
  task_type?: string;
  task_start_time?: string;
  task_end_time?: string | null;
  execution_stats?: Record<string, unknown>;
  task_plugin_arguments?: Record<string, string>;
  task_id?: string;
  previous_task_id?: string;
  status?: string;
  reason?: string;
  input_artifacts?: Record<string, unknown>;
  output_artifacts?: Record<string, unknown>;
  output_directory?: string;
  result?: Record<string, unknown>;
  input_parameters?: Record<string, unknown>;
  next_timeout?: string;
}

export interface PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage: string | null;
  previousPage: string | null;
  data: T[];
}

// MONAI Workflow Manager API Client
export class MonaiWorkflowClient {
  private baseUrl: string;
  private headers: HeadersInit;
  private useProxy: boolean;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_MONAI_WORKFLOW_API_URL || "http://localhost:5000", apiKey?: string) {
    // If baseUrl is provided, use it directly (for backward compatibility)
    // Otherwise, use the Next.js API routes as a proxy
    this.useProxy = !baseUrl;
    this.baseUrl = baseUrl || "";
    this.headers = {
      "Content-Type": "application/json",
      ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    };
  }

  // Helper method to get the appropriate URL
  private getUrl(endpoint: string): string {
    if (this.useProxy) {
      // Use Next.js API routes as a proxy
      return `/api/monai${endpoint}`;
    }
    // Use direct connection to MONAI Workflow Manager
    return `${this.baseUrl}${endpoint}`;
  }

  // Workflows API
  async getWorkflows(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Workflow>> {
    try {
      const url = this.getUrl(`/workflows?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to get workflows: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching workflows:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  async getWorkflow(id: string): Promise<Workflow> {
    try {
      const url = this.getUrl(`/workflows/${id}`);
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to get workflow: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching workflow:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  async createWorkflow(workflow: Workflow): Promise<Workflow> {
    try {
      const url = this.getUrl("/workflows");
      const response = await fetch(url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(workflow),
      });

      if (!response.ok) {
        throw new Error(`Failed to create workflow: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating workflow:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  async updateWorkflow(id: string, workflow: Workflow): Promise<Workflow> {
    try {
      const url = this.getUrl(`/workflows/${id}`);
      const response = await fetch(url, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(workflow),
      });

      if (!response.ok) {
        throw new Error(`Failed to update workflow: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating workflow:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  async deleteWorkflow(id: string): Promise<void> {
    try {
      const url = this.getUrl(`/workflows/${id}`);
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to delete workflow: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting workflow:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  // Workflow Instances API
  async getWorkflowInstances(
    pageNumber: number = 1,
    pageSize: number = 10,
    status?: string,
    payloadId?: string
  ): Promise<PaginatedResponse<WorkflowInstance>> {
    try {
      let url = this.getUrl(`/workflowinstances?pageNumber=${pageNumber}&pageSize=${pageSize}`);

      if (status) {
        url += `&status=${status}`;
      }

      if (payloadId) {
        url += `&payloadId=${payloadId}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to get workflow instances: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching workflow instances:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  async getWorkflowInstance(id: string): Promise<WorkflowInstance> {
    try {
      const url = this.getUrl(`/workflowinstances/${id}`);
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to get workflow instance: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching workflow instance:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  async createWorkflowInstance(
    workflowId: string,
    payloadId: string,
    bucketId: string
  ): Promise<WorkflowInstance> {
    try {
      const url = this.getUrl(`/workflowinstances`);
      const response = await fetch(url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          workflow_id: workflowId,
          payload_id: payloadId,
          bucket_id: bucketId,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create workflow instance: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating workflow instance:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  async acknowledgeFailedTask(
    instanceId: string,
    taskId: string
  ): Promise<void> {
    try {
      const url = this.getUrl(`/workflowinstances/${instanceId}/tasks/${taskId}/acknowledge`);
      const response = await fetch(url, {
        method: "PUT",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to acknowledge failed task: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error acknowledging failed task:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }

  // Health API
  async getHealth(): Promise<{ status: string }> {
    try {
      const url = this.getUrl(`/health`);
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to get health status: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching health status:", error);
      if (error instanceof Error && error.message === "Failed to fetch") {
        throw new Error(
          `Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`
        );
      }
      throw error;
    }
  }
}

export default MonaiWorkflowClient;
