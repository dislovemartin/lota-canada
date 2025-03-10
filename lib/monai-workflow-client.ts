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
  input_metadata?: Record<string, any>;
  tasks?: WorkflowInstanceTask[];
}

export interface WorkflowInstanceTask {
  execution_id?: string;
  workflow_instance_id?: string;
  task_type?: string;
  task_start_time?: string;
  task_end_time?: string | null;
  execution_stats?: Record<string, any>;
  task_plugin_arguments?: Record<string, string>;
  task_id?: string;
  previous_task_id?: string;
  status?: string;
  reason?: string;
  input_artifacts?: Record<string, any>;
  output_artifacts?: Record<string, any>;
  output_directory?: string;
  result?: Record<string, any>;
  input_parameters?: Record<string, any>;
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

  constructor(baseUrl: string = "http://localhost:5000", apiKey?: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    };
  }

  // Workflows API
  async getWorkflows(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Workflow>> {
    const response = await fetch(
      `${this.baseUrl}/workflows?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: this.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get workflows: ${response.statusText}`);
    }

    return await response.json();
  }

  async getWorkflow(id: string): Promise<Workflow> {
    const response = await fetch(`${this.baseUrl}/workflows/${id}`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to get workflow: ${response.statusText}`);
    }

    return await response.json();
  }

  async createWorkflow(workflow: Workflow): Promise<Workflow> {
    const response = await fetch(`${this.baseUrl}/workflows`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(workflow),
    });

    if (!response.ok) {
      throw new Error(`Failed to create workflow: ${response.statusText}`);
    }

    return await response.json();
  }

  async updateWorkflow(id: string, workflow: Workflow): Promise<Workflow> {
    const response = await fetch(`${this.baseUrl}/workflows/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(workflow),
    });

    if (!response.ok) {
      throw new Error(`Failed to update workflow: ${response.statusText}`);
    }

    return await response.json();
  }

  async deleteWorkflow(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/workflows/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete workflow: ${response.statusText}`);
    }
  }

  // Workflow Instances API
  async getWorkflowInstances(
    pageNumber: number = 1,
    pageSize: number = 10,
    status?: string,
    payloadId?: string
  ): Promise<PaginatedResponse<WorkflowInstance>> {
    let url = `${this.baseUrl}/workflowinstances?pageNumber=${pageNumber}&pageSize=${pageSize}`;

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
  }

  async getWorkflowInstance(id: string): Promise<WorkflowInstance> {
    const response = await fetch(`${this.baseUrl}/workflowinstances/${id}`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get workflow instance: ${response.statusText}`
      );
    }

    return await response.json();
  }

  async createWorkflowInstance(
    workflowId: string,
    payloadId: string,
    bucketId: string
  ): Promise<WorkflowInstance> {
    const response = await fetch(`${this.baseUrl}/workflowinstances`, {
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
  }

  async acknowledgeFailedTask(
    instanceId: string,
    taskId: string
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/workflowinstances/${instanceId}/tasks/${taskId}/acknowledge`,
      {
        method: "PUT",
        headers: this.headers,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to acknowledge failed task: ${response.statusText}`
      );
    }
  }

  // Health API
  async getHealth(): Promise<{ status: string }> {
    const response = await fetch(`${this.baseUrl}/health`, {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to get health status: ${response.statusText}`);
    }

    return await response.json();
  }
}

export default MonaiWorkflowClient;
