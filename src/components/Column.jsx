import { useDroppable } from '@dnd-kit/core';
import Task from './Task';

function Column({ title, status, tasks = [], onAddTask, onEditTask, onDeleteTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const columnStyles = {
    todo: {
      accentColor: '#3b82f6',
      bgAccent: 'bg-blue-500/10',
    },
    'in-progress': {
      accentColor: '#eab308',
      bgAccent: 'bg-yellow-500/10',
    },
    done: {
      accentColor: '#22c55e',
      bgAccent: 'bg-green-500/10',
    },
  };

  const style = columnStyles[status] || columnStyles.todo;

  return (
    <div
      ref={setNodeRef}
      className={`bg-[#1a1d24] rounded-lg p-4 min-h-[500px] flex flex-col transition-all duration-200 border border-[#2e333d] ${
        isOver ? 'border-[#3b82f6] bg-[#1e2128]' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#f1f5f9] uppercase tracking-wide flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: style.accentColor }}
          ></span>
          {title}
          <span className="ml-1 text-xs font-normal text-[#64748b] bg-[#21252e] px-2 py-0.5 rounded">
            {tasks.length}
          </span>
        </h2>
        {onAddTask && (
          <button
            onClick={onAddTask}
            onMouseDown={(e) => e.preventDefault()}
            className="bg-[#3b82f6]/20 text-[#60a5fa] px-3 py-1.5 rounded-md hover:bg-[#3b82f6]/30 transition-colors text-sm font-medium border border-[#3b82f6]/30"
          >
            + Add
          </button>
        )}
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
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
