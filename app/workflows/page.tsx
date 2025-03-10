"use client";

import MonaiWorkflowClient, {
  Workflow,
  WorkflowInstance,
} from "@/lib/monai-workflow-client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [instances, setInstances] = useState<WorkflowInstance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"workflows" | "instances">(
    "workflows"
  );

  const client = new MonaiWorkflowClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === "workflows") {
          const response = await client.getWorkflows();
          setWorkflows(response.data);
        } else {
          const response = await client.getWorkflowInstances();
          setInstances(response.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to fetch data. The MONAI Workflow Manager might not be running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const getStatusColor = (status: string | undefined) => {
    if (!status) return "bg-gray-200";

    switch (status.toLowerCase()) {
      case "succeeded":
        return "bg-green-200 text-green-800";
      case "failed":
        return "bg-red-200 text-red-800";
      case "running":
        return "bg-blue-200 text-blue-800";
      case "created":
        return "bg-purple-200 text-purple-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">MONAI Workflow Manager</h1>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("workflows")}
              className={`${
                activeTab === "workflows"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Workflows
            </button>
            <button
              onClick={() => setActiveTab("instances")}
              className={`${
                activeTab === "instances"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Workflow Instances
            </button>
          </nav>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="mt-2">
            Make sure the MONAI Workflow Manager is running and accessible at
            http://localhost:5000.
          </p>
        </div>
      ) : (
        <>
          {activeTab === "workflows" ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Workflows</h2>
                <Link
                  href="/workflows/create"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Workflow
                </Link>
              </div>

              {workflows.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No workflows found. Create a new workflow to get
                        started.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {workflows.map((workflow) => (
                      <li key={workflow.id}>
                        <Link
                          href={`/workflows/${workflow.id}`}
                          className="block hover:bg-gray-50"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                  {workflow.name}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    v{workflow.version}
                                  </p>
                                </div>
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                  Revision {workflow.revision}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  {workflow.description}
                                </p>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <p>
                                  {workflow.tasks.length} task
                                  {workflow.tasks.length !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Workflow Instances</h2>
                <Link
                  href="/workflows/execute"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  Execute Workflow
                </Link>
              </div>

              {instances.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No workflow instances found. Execute a workflow to get
                        started.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {instances.map((instance) => (
                      <li key={instance.id}>
                        <Link
                          href={`/workflows/instances/${instance.id}`}
                          className="block hover:bg-gray-50"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                  {instance.workflow_name || "Unnamed Workflow"}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                      instance.status
                                    )}`}
                                  >
                                    {instance.status}
                                  </p>
                                </div>
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                  {new Date(
                                    instance.start_time || ""
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  Payload ID: {instance.payload_id}
                                </p>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <p>
                                  {instance.tasks?.length || 0} task
                                  {(instance.tasks?.length || 0) !== 1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
