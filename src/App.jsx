import TodoForm from "./component/TodoForm";
import TodoList from "./component/TodoList";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : ["کارهای شخصی", "کارهای منزل"];
  });

  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addTodo = (text, category) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      category: category,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const addCategory = (newCategory) => {
    const trimmed = newCategory.trim();
    if (trimmed !== "" && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const reorderTodos = (newOrder) => {
    setTodos(newOrder);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const getFilteredTodos = () => {
    let filtered = todos;

    if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (filter === "active") {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((todo) => todo.category === selectedCategory);
    }

    return filtered;
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };
  const deleteCategory = (categoryToDelete) => {
    const updatedTodos = todos.filter((todo) => todo.category !== categoryToDelete);
    setTodos(updatedTodos);
    const updatedCategories = categories.filter((cat) => cat !== categoryToDelete);
    setCategories(updatedCategories);
    if (selectedCategory === categoryToDelete) {
      setSelectedCategory("all");
    }
  };
  

  return (
    <div className="container">
      <div
        className={`theme-toggle ${darkMode ? "dark" : ""}`}
        onClick={toggleTheme}
      >
        <div className="toggle-thumb"></div>
      </div>

      <h1>To Do App</h1>

      <TodoForm
        onAddTodo={addTodo}
        categories={categories}
        onAddCategory={addCategory}
      />

      {/* فیلتر بر اساس وضعیت تسک */}
      <div className="filters" style={{ margin: "16px 0" }}>
        <button onClick={() => {handleFilterClick("all");setSelectedCategory("all")}}>All</button>
        <button onClick={() => handleFilterClick("active")}>Active</button>
        <button onClick={() => handleFilterClick("completed")}>
          Completed
        </button>
      </div>

      {/* فیلتر بر اساس دسته‌بندی */}
      <div className="filters" style={{ margin: "16px 0" }}>
        {/* <button onClick={() => {setSelectedCategory("all");setFilter("all")}}>همه دسته‌ها</button> */}
        {categories.map((cat) => (
  <div key={cat} style={{ position: "relative", display: "inline-block" }}>
    <button onClick={() =>{ setSelectedCategory(cat);setFilter("all")}}>{cat}</button>
    <button
      onClick={() => deleteCategory(cat)}
      className="icon-btn delete"
      style={{
        position: "absolute",
        top: -6,
        right: -6,
        background: "red",
        color: "white",
        borderRadius: "50%",
        width: 20,
        height: 20,
        fontSize: 12,
        padding: 0,
        transition:'.5s'
      }}
      title="حذف دسته"
    >
      ×
    </button>
  </div>
))}

      </div>

      <TodoList
        todos={getFilteredTodos()}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onReorder={reorderTodos}
      />
    </div>
  );
}

export default App;
