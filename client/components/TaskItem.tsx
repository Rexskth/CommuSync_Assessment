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
  const [showConfirm, setShowConfirm] = useState(false);

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
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await onDelete(task._id);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md transition-all duration-200 ${
        task.completed ? 'opacity-60 bg-gray-50' : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={loading}
          className="mt-1 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium break-words ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-600 break-words">{task.description}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Created: {formatDate(task.createdAt)}
          </p>
        </div>

        <div className="flex-shrink-0">
          {showConfirm ? (
            <div className="flex items-center gap-2">
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-red-300 transition-colors"
              >
                {loading ? '...' : 'Yes'}
              </button>
              <button
                onClick={cancelDelete}
                disabled={loading}
                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 transition-colors"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:text-gray-300 disabled:hover:bg-transparent rounded transition-colors"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
