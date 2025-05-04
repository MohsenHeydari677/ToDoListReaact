import { useState } from "react";

function TodoForm({ onAddTodo, categories, onAddCategory }) {
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const finalCategory =
      newCategory.trim() !== "" ? newCategory.trim() : selectedCategory;

    if (!finalCategory) return;

    if (newCategory.trim() !== "") {
      onAddCategory(finalCategory);
      setNewCategory("");
    }

    onAddTodo(text, finalCategory);
    setText("");
    setSelectedCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
    >
      <input
        type="text"
        placeholder="Add New Task ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          paddingLeft: "10px",
          borderRadius: "20px",
          border: "1px solid #000",
          width: "265px",
          height: "28px",
        }}
      />

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            width: "150px",
          }}
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{
            padding: "5px 10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            width: "150px",
          }}
        />
      </div>

      <button
        type="submit"
        className="ADbtn"
        style={{
          padding: "5px 20px",
          borderRadius: "20px",
          border: "1px solid #000",
          backgroundColor: "#0077ff",
          color: "#fff",
        }}
      >
        ADD
      </button>
    </form>
  );
}

export default TodoForm;
