'use client';

import { useState } from 'react';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onToggleComplete(task._id);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    if (!confirm('Are you sure you want to delete this task?')) return;
    setLoading(true);
    try {
      await onDelete(task._id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md flex items-start gap-4 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        disabled={loading}
        className="mt-1 h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
      />

      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-1 text-sm text-gray-600">{task.description}</p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-500 hover:text-red-700 disabled:text-red-300 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
