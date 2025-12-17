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
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter task description (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <div className="flex gap-3">
          {['low', 'medium', 'high'].map((p) => (
            <label key={p} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priority"
                value={p}
                checked={priority === p}
                onChange={(e) => setPriority(e.target.value)}
                className="mr-2 cursor-pointer"
              />
              <span className="capitalize">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {task ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
