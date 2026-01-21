import { useState, useEffect, useCallback } from 'react';
import { saveTodos, loadTodos } from '../utils/storage';
import { generateId } from '../utils/helpers';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
    setIsLoading(false);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]);

  const addTodo = useCallback((description, category = 'Personal') => {
    const newTodo = {
      id: generateId(),
      description,
      category,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    return newTodo;
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: Date.now(),
            }
          : todo
      )
    );
  }, []);

  const updateTodo = useCallback((id, updates) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...updates,
              updatedAt: Date.now(),
            }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, []);

  const clearAll = useCallback(() => {
    setTodos([]);
  }, []);

  return {
    todos,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    clearAll,
  };
};
