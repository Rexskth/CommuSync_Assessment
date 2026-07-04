'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { fetchTasks, createTask, toggleTaskComplete, deleteTask } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (title: string, description?: string) => {
    const newTask = await createTask({ title, description });
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = async (id: string) => {
    const updatedTask = await toggleTaskComplete(id);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? updatedTask : task))
    );
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Mini Task Manager
        </h1>

        <TaskForm onAddTask={handleAddTask} />

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <TaskList
          tasks={tasks}
          loading={loading}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </div>
    </main>
  );
}
