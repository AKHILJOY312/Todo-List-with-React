import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  const addTask = () => {
    const trimmed = input.trim();

    if (trimmed === "") {
      setError("Task cannot be empty");
      return;
    }

    if (!/[a-zA-Z]/.test(trimmed)) {
      setError("Task must contain at least one letter");
      return;
    }

    const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
    if (letterCount < 3) {
      setError("Task must contain at least 3 letters");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
    setError("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    const trimmed = editText.trim();
    if (
      !/[a-zA-Z]/.test(trimmed) ||
      (trimmed.match(/[a-zA-Z]/g) || []).length < 3
    ) {
      setEditError("Edited task must contain at least 3 letters");
      return;
    }

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: trimmed } : task))
    );

    setEditingTaskId(null);
    setEditText("");
    setEditError("");
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6 p-2 border rounded-md m-5">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-black font-mono ">
          Todo App
        </h1>

        {/* Add Task */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex gap-2">
            <input
              className={`flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              type="text"
              placeholder="Enter your task..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={addTask}
              title="Add new Task"
            >
              Add
            </button>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>

        {/* Active Tasks */}
        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">Tasks</h2>
          {activeTasks.length === 0 && (
            <p className="text-sm text-gray-500">No tasks yet.</p>
          )}
          <div className="space-y-2">
            {activeTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
                onEditStart={() => startEdit(task)}
                onEditCancel={cancelEdit}
                onEditSave={saveEdit}
                isEditing={editingTaskId === task.id}
                editedText={editText}
                setEditedText={setEditText}
                editError={editError}
                setEditError={setEditError}
              />
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h2 className="font-semibold text-green-600 mb-2">Completed</h2>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onEditStart={() => startEdit(task)}
                  onEditCancel={cancelEdit}
                  onEditSave={saveEdit}
                  isEditing={editingTaskId === task.id}
                  editedText={editText}
                  setEditedText={setEditText}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
