import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Column from './Column';
import Modal from './Modal';
import TaskForm from './TaskForm';
import Task from './Task';

const STORAGE_KEY = 'kanban-tasks';

const defaultTasks = [
  {
    id: '1',
    title: 'Design landing page',
    description: 'Create mockups for the new landing page design',
    priority: 'high',
    status: 'todo',
  },
  {
    id: '2',
    title: 'Set up database',
    description: 'Configure PostgreSQL database and create initial schema',
    priority: 'high',
    status: 'todo',
  },
  {
    id: '3',
    title: 'Write documentation',
    description: '',
    priority: 'low',
    status: 'todo',
  },
  {
    id: '4',
    title: 'Implement authentication',
    description: 'Add user login and registration functionality',
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: '5',
    title: 'Fix responsive layout',
    description: 'Resolve mobile view issues on the dashboard',
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: '6',
    title: 'Update dependencies',
    description: 'Upgrade all npm packages to latest versions',
    priority: 'low',
    status: 'done',
  },
  {
    id: '7',
    title: 'Add unit tests',
    description: 'Write tests for user service module',
    priority: 'medium',
    status: 'done',
  },
];

function KanbanBoard() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : defaultTasks;
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      return defaultTasks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      setTasks(
        tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Kanban Board
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Column
              title="To Do"
              status="todo"
              tasks={getTasksByStatus('todo')}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
            />
            <Column
              title="In Progress"
              status="in-progress"
              tasks={getTasksByStatus('in-progress')}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
            />
            <Column
              title="Done"
              status="done"
              tasks={getTasksByStatus('done')}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTask ? 'Edit Task' : 'Add New Task'}
        >
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
      <DragOverlay>
        {activeTask ? (
          <div style={{ opacity: 0.75 }}>
            <Task task={activeTask} onEdit={() => {}} onDelete={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
