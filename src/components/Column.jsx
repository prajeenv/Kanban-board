import { useDroppable } from '@dnd-kit/core';
import Task from './Task';

function Column({ title, status, tasks = [], onAddTask, onEditTask, onDeleteTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 rounded-lg p-4 min-h-[500px] flex flex-col transition-colors ${
        isOver ? 'bg-blue-100 ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700">
          {title}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({tasks.length})
          </span>
        </h2>
        {onAddTask && (
          <button
            onClick={onAddTask}
            onMouseDown={(e) => e.preventDefault()}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Add
          </button>
        )}
      </div>
      <div className="flex-1 space-y-3">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
