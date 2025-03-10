"use client";

import MonaiWorkflowClient, {
  Workflow,
  WorkflowTask,
} from "@/lib/monai-workflow-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateWorkflowPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [workflow, setWorkflow] = useState<Workflow>({
    name: "",
    version: "1.0.0",
    description: "",
    informatics_gateway: {
      ae_title: "MonaiSCU",
      data_origins: [""],
      export_destinations: [""],
    },
    tasks: [],
  });

  const [currentTask, setCurrentTask] = useState<WorkflowTask>({
    id: "",
    description: "",
    type: "argo",
    args: {},
    artifacts: {
      input: [],
      output: [],
    },
  });

  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleWorkflowChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("informatics_gateway.")) {
      const field = name.split(".")[1];
      setWorkflow({
        ...workflow,
        informatics_gateway: {
          ...workflow.informatics_gateway,
          [field]: value,
        },
      });
    } else {
      setWorkflow({
        ...workflow,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index: number
  ) => {
    const { value } = e.target;

    if (field === "data_origins") {
      const newDataOrigins = [...workflow.informatics_gateway.data_origins];
      newDataOrigins[index] = value;

      setWorkflow({
        ...workflow,
        informatics_gateway: {
          ...workflow.informatics_gateway,
          data_origins: newDataOrigins,
        },
      });
    } else if (field === "export_destinations") {
      const newExportDestinations = [
        ...workflow.informatics_gateway.export_destinations,
      ];
      newExportDestinations[index] = value;

      setWorkflow({
        ...workflow,
        informatics_gateway: {
          ...workflow.informatics_gateway,
          export_destinations: newExportDestinations,
        },
      });
    }
  };

  const addArrayItem = (field: string) => {
    if (field === "data_origins") {
      setWorkflow({
        ...workflow,
        informatics_gateway: {
          ...workflow.informatics_gateway,
          data_origins: [...workflow.informatics_gateway.data_origins, ""],
        },
      });
    } else if (field === "export_destinations") {
      setWorkflow({
        ...workflow,
        informatics_gateway: {
          ...workflow.informatics_gateway,
          export_destinations: [
            ...workflow.informatics_gateway.export_destinations,
            "",
          ],
        },
      });
    }
  };

  const removeArrayItem = (field: string, index: number) => {
    if (field === "data_origins") {
      const newDataOrigins = [...workflow.informatics_gateway.data_origins];
      newDataOrigins.splice(index, 1);

      setWorkflow({
        ...workflow,
        informatics_gateway: {
          ...workflow.informatics_gateway,
          data_origins: newDataOrigins,
        },
      });
    } else if (field === "export_destinations") {
      const newExportDestinations = [
        ...workflow.informatics_gateway.export_destinations,
      ];
      newExportDestinations.splice(index, 1);

      setWorkflow({
        ...workflow,
        informatics_gateway: {
          ...workflow.informatics_gateway,
          export_destinations: newExportDestinations,
        },
      });
    }
  };

  const handleTaskChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("args.")) {
      const argName = name.split(".")[1];
      setCurrentTask({
        ...currentTask,
        args: {
          ...currentTask.args,
          [argName]: value,
        },
      });
    } else {
      setCurrentTask({
        ...currentTask,
        [name]: value,
      });
    }
  };

  const addTask = () => {
    setWorkflow({
      ...workflow,
      tasks: [...workflow.tasks, currentTask],
    });

    setCurrentTask({
      id: "",
      description: "",
      type: "argo",
      args: {},
      artifacts: {
        input: [],
        output: [],
      },
    });

    setShowTaskForm(false);
  };

  const removeTask = (index: number) => {
    const newTasks = [...workflow.tasks];
    newTasks.splice(index, 1);

    setWorkflow({
      ...workflow,
      tasks: newTasks,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (workflow.tasks.length === 0) {
      setError("At least one task is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const client = new MonaiWorkflowClient();
      await client.createWorkflow(workflow);

      setSuccess(true);
      setTimeout(() => {
        router.push("/workflows");
      }, 2000);
    } catch (err) {
      console.error("Error creating workflow:", err);
      setError(
        "Failed to create workflow. The MONAI Workflow Manager might not be running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Workflow</h1>

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
            Workflow created successfully! Redirecting...
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Workflow Information</h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={workflow.name}
              onChange={handleWorkflowChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="version"
            >
              Version
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="version"
              type="text"
              name="version"
              value={workflow.version}
              onChange={handleWorkflowChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={workflow.description}
              onChange={handleWorkflowChange}
              rows={3}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Informatics Gateway</h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ae_title"
            >
              AE Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ae_title"
              type="text"
              name="informatics_gateway.ae_title"
              value={workflow.informatics_gateway.ae_title}
              onChange={handleWorkflowChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Data Origins
            </label>
            {workflow.informatics_gateway.data_origins.map((origin, index) => (
              <div key={index} className="flex mb-2">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={origin}
                  onChange={(e) => handleArrayChange(e, "data_origins", index)}
                  required
                />
                <button
                  type="button"
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => removeArrayItem("data_origins", index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => addArrayItem("data_origins")}
            >
              Add Data Origin
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Export Destinations
            </label>
            {workflow.informatics_gateway.export_destinations.map(
              (destination, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={destination}
                    onChange={(e) =>
                      handleArrayChange(e, "export_destinations", index)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() =>
                      removeArrayItem("export_destinations", index)
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            )}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => addArrayItem("export_destinations")}
            >
              Add Export Destination
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>

          {workflow.tasks.length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    No tasks added yet. Add at least one task to create a
                    workflow.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
              <ul className="divide-y divide-gray-200">
                {workflow.tasks.map((task, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {task.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {task.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Type: {task.type}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => removeTask(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showTaskForm ? (
            <div className="bg-gray-100 p-4 rounded mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add Task
              </h3>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="task_id"
                >
                  Task ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="task_id"
                  type="text"
                  name="id"
                  value={currentTask.id}
                  onChange={handleTaskChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="task_description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="task_description"
                  name="description"
                  value={currentTask.description}
                  onChange={handleTaskChange}
                  rows={2}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="task_type"
                >
                  Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="task_type"
                  name="type"
                  value={currentTask.type}
                  onChange={handleTaskChange}
                  required
                >
                  <option value="argo">Argo</option>
                  <option value="docker">Docker</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-900 mb-2">
                  Arguments
                </h4>

                {currentTask.type === "argo" && (
                  <>
                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_namespace"
                      >
                        Namespace
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_namespace"
                        type="text"
                        name="args.namespace"
                        value={currentTask.args.namespace || ""}
                        onChange={handleTaskChange}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_workflow_template_name"
                      >
                        Workflow Template Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_workflow_template_name"
                        type="text"
                        name="args.workflow_template_name"
                        value={currentTask.args.workflow_template_name || ""}
                        onChange={handleTaskChange}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_server_url"
                      >
                        Server URL
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_server_url"
                        type="text"
                        name="args.server_url"
                        value={currentTask.args.server_url || ""}
                        onChange={handleTaskChange}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_allow_insecure"
                      >
                        Allow Insecure
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_allow_insecure"
                        name="args.allow_insecure"
                        value={currentTask.args.allow_insecure || "false"}
                        onChange={handleTaskChange}
                        required
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  </>
                )}

                {currentTask.type === "docker" && (
                  <>
                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_image"
                      >
                        Image
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_image"
                        type="text"
                        name="args.image"
                        value={currentTask.args.image || ""}
                        onChange={handleTaskChange}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_command"
                      >
                        Command
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_command"
                        type="text"
                        name="args.command"
                        value={currentTask.args.command || ""}
                        onChange={handleTaskChange}
                      />
                    </div>
                  </>
                )}

                {currentTask.type === "email" && (
                  <>
                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_to"
                      >
                        To
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_to"
                        type="email"
                        name="args.to"
                        value={currentTask.args.to || ""}
                        onChange={handleTaskChange}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_subject"
                      >
                        Subject
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_subject"
                        type="text"
                        name="args.subject"
                        value={currentTask.args.subject || ""}
                        onChange={handleTaskChange}
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="args_body"
                      >
                        Body
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="args_body"
                        name="args.body"
                        value={currentTask.args.body || ""}
                        onChange={handleTaskChange}
                        rows={3}
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => setShowTaskForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={addTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowTaskForm(true)}
            >
              Add Task
            </button>
          )}
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
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Workflow"}
          </button>
        </div>
      </form>
    </div>
  );
}
