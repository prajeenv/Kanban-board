import { useDraggable } from '@dnd-kit/core';

function Task({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityStyles = {
    low: {
      border: 'border-l-2 border-[#22c55e]',
      badge: 'bg-[#22c55e]/10 text-[#22c55e]',
    },
    medium: {
      border: 'border-l-2 border-[#eab308]',
      badge: 'bg-[#eab308]/10 text-[#eab308]',
    },
    high: {
      border: 'border-l-2 border-[#ef4444]',
      badge: 'bg-[#ef4444]/10 text-[#ef4444]',
    },
  };

  const priorityStyle = priorityStyles[task.priority] || priorityStyles.medium;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#21252e] rounded-md p-4 ${priorityStyle.border} hover:bg-[#282d38] transition-colors duration-150 group touch-none relative cursor-pointer`}
    >
      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="text-xs bg-[#3b82f6]/10 text-[#3b82f6] px-2 py-1 rounded hover:bg-[#3b82f6]/20 transition-colors font-medium"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="text-xs bg-[#ef4444]/10 text-[#ef4444] px-2 py-1 rounded hover:bg-[#ef4444]/20 transition-colors font-medium"
        >
          Delete
        </button>
      </div>
      <div
        {...listeners}
        {...attributes}
        onClick={() => onEdit(task)}
        onMouseDown={(e) => e.preventDefault()}
        className="cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-[#f1f5f9] pr-20 text-sm leading-snug">
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default Task;
