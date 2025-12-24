import { useState, useEffect } from 'react';

function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 flex flex-col h-full">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#f1f5f9] mb-2">
          Title <span className="text-[#ef4444]">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#21252e] border border-[#2e333d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-[#f1f5f9] placeholder-[#64748b] transition-all"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <label htmlFor="description" className="block text-sm font-medium text-[#f1f5f9] mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 w-full px-4 py-2.5 bg-[#21252e] border border-[#2e333d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent resize-none text-[#f1f5f9] placeholder-[#64748b] transition-all"
          placeholder="Enter task description (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#f1f5f9] mb-3">
          Priority
        </label>
        <div className="flex gap-3">
          {['low', 'medium', 'high'].map((p) => {
            const priorityColors = {
              low: { border: 'border-[#22c55e]', text: 'text-[#22c55e]', bg: 'bg-[#22c55e]/10' },
              medium: { border: 'border-[#eab308]', text: 'text-[#eab308]', bg: 'bg-[#eab308]/10' },
              high: { border: 'border-[#ef4444]', text: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10' },
            };
            const isChecked = priority === p;
            const colors = priorityColors[p];
            return (
              <label
                key={p}
                className={`flex items-center cursor-pointer px-4 py-2 rounded-md border transition-all ${
                  isChecked
                    ? `${colors.border} ${colors.text} ${colors.bg}`
                    : 'border-[#2e333d] text-[#94a3b8] hover:border-[#64748b]'
                }`}
              >
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mr-2 cursor-pointer accent-[#3b82f6]"
                />
                <span className="capitalize font-medium text-sm">{p}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 pt-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm bg-[#21252e] text-[#94a3b8] px-5 py-2.5 rounded-md hover:bg-[#282d38] hover:text-[#f1f5f9] transition-colors font-medium border border-[#2e333d]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm bg-[#3b82f6]/20 text-[#60a5fa] px-5 py-2.5 rounded-md hover:bg-[#3b82f6]/30 transition-colors font-medium border border-[#3b82f6]/30"
        >
          {task ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
