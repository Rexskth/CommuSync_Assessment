'use client';

import { Task } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskList({
  tasks,
  loading,
  onToggleComplete,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="mt-6 text-center text-gray-500">Loading tasks...</div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
