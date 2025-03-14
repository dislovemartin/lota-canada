/**
 * MONAI Deploy Workflow Manager API Client
 * This client provides methods to interact with the MONAI Deploy Workflow Manager API.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// MONAI Workflow Manager API Client
export class MonaiWorkflowClient {
    constructor(baseUrl = process.env.NEXT_PUBLIC_MONAI_WORKFLOW_API_URL || "", apiKey) {
        // If baseUrl is provided, use it directly (for backward compatibility)
        // Otherwise, use the Next.js API routes as a proxy
        this.useProxy = !baseUrl;
        this.baseUrl = baseUrl || "";
        this.headers = Object.assign({ "Content-Type": "application/json" }, (apiKey && { Authorization: `Bearer ${apiKey}` }));
    }

    // Helper method to get the appropriate URL
    getUrl(endpoint) {
        if (this.useProxy) {
            // Use Next.js API routes as a proxy
            return `/api/monai${endpoint}`;
        }
        // Use direct connection to MONAI Workflow Manager
        return `${this.baseUrl}${endpoint}`;
    }

    // Workflows API
    getWorkflows() {
        return __awaiter(this, arguments, void 0, function* (pageNumber = 1, pageSize = 10) {
            try {
                const url = this.getUrl(`/workflows?pageNumber=${pageNumber}&pageSize=${pageSize}`);
                const response = yield fetch(url, {
                    method: "GET",
                    headers: this.headers,
                });
                if (!response.ok) {
                    throw new Error(`Failed to get workflows: ${response.statusText}`);
                }
                return yield response.json();
            } catch (error) {
                console.error("Error fetching workflows:", error);
                if (error.message === "Failed to fetch") {
                    throw new Error(`Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`);
                }
                throw error;
            }
        });
    }
    getWorkflow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl(`/workflows/${id}`);
            const response = yield fetch(url, {
                method: "GET",
                headers: this.headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to get workflow: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
    createWorkflow(workflow) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl("/workflows");
            const response = yield fetch(url, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(workflow),
            });
            if (!response.ok) {
                throw new Error(`Failed to create workflow: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
    updateWorkflow(id, workflow) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl(`/workflows/${id}`);
            const response = yield fetch(url, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(workflow),
            });
            if (!response.ok) {
                throw new Error(`Failed to update workflow: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
    deleteWorkflow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl(`/workflows/${id}`);
            const response = yield fetch(url, {
                method: "DELETE",
                headers: this.headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to delete workflow: ${response.statusText}`);
            }
        });
    }
    // Workflow Instances API
    getWorkflowInstances() {
        return __awaiter(this, arguments, void 0, function* (pageNumber = 1, pageSize = 10, status, payloadId) {
            try {
                let url = this.getUrl(`/workflowinstances?pageNumber=${pageNumber}&pageSize=${pageSize}`);
                if (status) {
                    url += `&status=${status}`;
                }
                if (payloadId) {
                    url += `&payloadId=${payloadId}`;
                }
                const response = yield fetch(url, {
                    method: "GET",
                    headers: this.headers,
                });
                if (!response.ok) {
                    throw new Error(`Failed to get workflow instances: ${response.statusText}`);
                }
                return yield response.json();
            } catch (error) {
                console.error("Error fetching workflow instances:", error);
                if (error.message === "Failed to fetch") {
                    throw new Error(`Failed to connect to MONAI Workflow Manager. Please ensure the service is running and accessible.`);
                }
                throw error;
            }
        });
    }
    getWorkflowInstance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl(`/workflowinstances/${id}`);
            const response = yield fetch(url, {
                method: "GET",
                headers: this.headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to get workflow instance: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
    createWorkflowInstance(workflowId, payloadId, bucketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl("/workflowinstances");
            const response = yield fetch(url, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    workflow_id: workflowId,
                    payload_id: payloadId,
                    bucket_id: bucketId,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to create workflow instance: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
    acknowledgeFailedTask(instanceId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl(`/workflowinstances/${instanceId}/tasks/${taskId}/acknowledge`);
            const response = yield fetch(url, {
                method: "PUT",
                headers: this.headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to acknowledge failed task: ${response.statusText}`);
            }
        });
    }
    // Health API
    getHealth() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl("/health");
            const response = yield fetch(url, {
                method: "GET",
                headers: this.headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to get health status: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
}
export default MonaiWorkflowClient;
