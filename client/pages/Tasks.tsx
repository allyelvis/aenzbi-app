import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { formatDate } from "../lib/utils";

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
}

const priorityIcons: Record<string, React.ReactNode> = {
  low: <Circle className="h-4 w-4 text-gray-400" />,
  medium: <Clock className="h-4 w-4 text-yellow-500" />,
  high: <AlertCircle className="h-4 w-4 text-red-500" />,
};

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Tasks() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
    queryFn: async () => {
      const res = await fetch("/api/tasks");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/tasks", {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const pendingTasks = filteredTasks.filter((t) => t.status === "pending");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in_progress");
  const completedTasks = filteredTasks.filter((t) => t.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your workflow tasks</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold">{pendingTasks.length}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">
            {inProgressTasks.length}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {completedTasks.length}
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate(formData);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Task Title *"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-card border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    updateMutation.mutate({
                      id: task.id,
                      status:
                        task.status === "completed" ? "pending" : "completed",
                    })
                  }
                  className="hover:opacity-70"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </button>
                <div>
                  <h3
                    className={`font-medium ${
                      task.status === "completed"
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {priorityIcons[task.priority]}
                {task.dueDate && (
                  <span className="text-sm text-muted-foreground">
                    {formatDate(task.dueDate)}
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusColors[task.status] || statusColors.pending
                  }`}
                >
                  {task.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No tasks found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
