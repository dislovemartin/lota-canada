"use client";

import MonaiWorkflowClient, { Workflow } from "@/lib/monai-workflow-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExecuteWorkflowPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingWorkflows, setLoadingWorkflows] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  const [payloadId, setPayloadId] = useState<string>("");
  const [bucketId, setBucketId] = useState<string>("monai-workflows");

  const client = new MonaiWorkflowClient();

  useEffect(() => {
    const fetchWorkflows = async () => {
      setLoadingWorkflows(true);
      setError(null);
      try {
        const response = await client.getWorkflows();
        setWorkflows(response.data);
      } catch (err) {
        console.error("Error fetching workflows:", err);
        setError(
          "Failed to fetch workflows. The MONAI Workflow Manager might not be running."
        );
      } finally {
        setLoadingWorkflows(false);
      }
    };

    fetchWorkflows();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWorkflowId) {
      setError("Please select a workflow");
      return;
    }

    if (!payloadId) {
      setError("Please enter a payload ID");
      return;
    }

    if (!bucketId) {
      setError("Please enter a bucket ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await client.createWorkflowInstance(
        selectedWorkflowId,
        payloadId,
        bucketId
      );

      setSuccess(true);
      setTimeout(() => {
        router.push("/workflows?tab=instances");
      }, 2000);
    } catch (err) {
      console.error("Error executing workflow:", err);
      setError(
        "Failed to execute workflow. The MONAI Workflow Manager might not be running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Execute Workflow</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline">
            {" "}
            Workflow execution started! Redirecting...
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Execution Parameters</h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="workflow"
            >
              Workflow
            </label>
            {loadingWorkflows ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 mr-2"></div>
                <span>Loading workflows...</span>
              </div>
            ) : workflows.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No workflows found. Please create a workflow first.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="workflow"
                value={selectedWorkflowId}
                onChange={(e) => setSelectedWorkflowId(e.target.value)}
                required
              >
                <option value="">Select a workflow</option>
                {workflows.map((workflow) => (
                  <option key={workflow.id} value={workflow.id}>
                    {workflow.name} (v{workflow.version})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="payload_id"
            >
              Payload ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="payload_id"
              type="text"
              value={payloadId}
              onChange={(e) => setPayloadId(e.target.value)}
              placeholder="e.g., 00000000-0000-0000-0000-000000000000"
              required
            />
            <p className="text-gray-600 text-xs italic mt-1">
              The payload ID should be a unique identifier for the data to be
              processed.
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bucket_id"
            >
              Bucket ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bucket_id"
              type="text"
              value={bucketId}
              onChange={(e) => setBucketId(e.target.value)}
              required
            />
            <p className="text-gray-600 text-xs italic mt-1">
              The bucket ID is the name of the MinIO bucket where the data is
              stored.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push("/workflows")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || loadingWorkflows || workflows.length === 0}
          >
            {loading ? "Executing..." : "Execute Workflow"}
          </button>
        </div>
      </form>
    </div>
  );
}
