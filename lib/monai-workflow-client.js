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
    constructor(baseUrl = "http://localhost:5000", apiKey) {
        this.baseUrl = baseUrl;
        this.headers = Object.assign({ "Content-Type": "application/json" }, (apiKey && { Authorization: `Bearer ${apiKey}` }));
    }
    // Workflows API
    getWorkflows() {
        return __awaiter(this, arguments, void 0, function* (pageNumber = 1, pageSize = 10) {
            const response = yield fetch(`${this.baseUrl}/workflows?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                method: "GET",
                headers: this.headers,
            });
            if (!response.ok) {
                throw new Error(`Failed to get workflows: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
    getWorkflow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/workflows/${id}`, {
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
            const response = yield fetch(`${this.baseUrl}/workflows`, {
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
            const response = yield fetch(`${this.baseUrl}/workflows/${id}`, {
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
            const response = yield fetch(`${this.baseUrl}/workflows/${id}`, {
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
            let url = `${this.baseUrl}/workflowinstances?pageNumber=${pageNumber}&pageSize=${pageSize}`;
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
        });
    }
    getWorkflowInstance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/workflowinstances/${id}`, {
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
            const response = yield fetch(`${this.baseUrl}/workflowinstances`, {
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
            const response = yield fetch(`${this.baseUrl}/workflowinstances/${instanceId}/tasks/${taskId}/acknowledge`, {
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
            const response = yield fetch(`${this.baseUrl}/health`, {
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
