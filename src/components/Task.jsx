import { useDraggable } from '@dnd-kit/core';

function Task({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    opacity: isDragging ? 0.75 : 1,
  };

  const priorityColors = {
    low: 'border-green-500',
    medium: 'border-yellow-500',
    high: 'border-red-500',
  };

  const priorityColor = priorityColors[task.priority] || priorityColors.medium;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border-l-2 ${priorityColor} group touch-none relative`}
    >
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
      <div
        {...listeners}
        {...attributes}
        onClick={() => onEdit(task)}
        onMouseDown={(e) => e.preventDefault()}
        className="cursor-pointer select-none"
      >
        <h3 className="font-semibold text-gray-800 pr-22">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 mt-2">{task.description}</p>
        )}
      </div>
    </div>
  );
}

export default Task;
