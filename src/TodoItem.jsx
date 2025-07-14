export default function TodoItem({
  task,
  onToggle,
  onDelete,
  onEditStart,
  onEditCancel,
  onEditSave,
  isEditing,
  editedText,
  setEditedText,
  editError,
  setEditError,
}) {
  return (
    <div className="flex justify-between items-center p-2 border rounded-md bg-gray-50 hover:bg-gray-100">
      {isEditing ? (
        <div className="flex flex-1 flex-col gap-1">
          {" "}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedText}
              onChange={(e) => {
                setEditedText(e.target.value);
                if (editError) setEditError("");
              }}
              className={`flex-1 px-2 py-1 border rounded-md ${
                editError ? "border-red-500" : "border-blue-400"
              }`}
            />
            <button
              onClick={() => onEditSave(task.id)}
              className="text-green-600 hover:underline"
              title="Save changes"
            >
              <i className="fa-solid fa-floppy-disk"></i>
            </button>
            <button
              onClick={onEditCancel}
              className="text-gray-500 hover:underline"
              title="Cancel editing"
            >
              <i className="fa-solid fa-ban"></i>
            </button>
          </div>
          {editError && <p className="text-red-500 text-xs">{editError}</p>}{" "}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={onToggle}
              className="w-4 h-4"
              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
            />
            <span
              className={
                task.completed ? "line-through text-gray-500" : "text-black"
              }
            >
              {task.text}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditStart(task)}
              className="ml-3 text-blue-600 hover:text-blue-800"
              title="Edit task"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
              title="Delete task"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
