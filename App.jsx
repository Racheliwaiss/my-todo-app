import React, { useState, useEffect } from 'react';
import { saveTodos, loadTodos } from './utils/storage';
import { generateId, getTodoCounts } from './utils/helpers';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import './App.css';

/**
 * App Component
 * Main application component that manages state and coordinates all child components
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
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

  const handleAddTodo = (text) => {
    const newTodo = {
      id: generateId(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const counts = getTodoCounts(todos);
  const activeCount = counts.active;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">טוען משימות...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-8 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">המשימות שלי</h1>
          <p className="text-gray-300 text-lg">נהל את משימותיך בקלות ויעילות</p>
        </header>

        {/* Status Message */}
        <div className="text-center mb-6">
          <p className="text-gray-300 font-medium">
            {activeCount === 0 && todos.length > 0 ? (
              <span className="text-cyan-400 text-lg">🎉 כל המשימות הושלמו!</span>
            ) : activeCount === 1 ? (
              <span className="text-cyan-400">נותרה {activeCount} משימה פעילה</span>
            ) : (
              <span className="text-cyan-400">נותרו {activeCount} משימות פעילות</span>
            )}
          </p>
        </div>

        {/* Main Content */}
        <main className="bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Todo Input */}
          <TodoInput onAddTodo={handleAddTodo} />

          {/* Filter Buttons */}
          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            todos={todos}
          />

          {/* Todo List */}
          <TodoList
            todos={todos}
            filter={filter}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </main>
      </div>
    </div>
  );
}

export default App;