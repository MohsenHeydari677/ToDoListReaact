import { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";


function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() === "") return;
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        background: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        marginBottom: "12px",
        transition: "all 0.3s ease",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ transform: "scale(1.2)", cursor: "pointer" }}
      />

      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border 0.2s ease",
          }}
          autoFocus
        />
      ) : (
        <span
          style={{
            flex: 1,
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#999" : "#333",
            transition: "color 0.3s ease, text-decoration 0.3s ease",
            fontSize: "16px",
          }}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="icon-btn save"
          style={{
            fontSize:'14px',
            background: "#2ecc71",
            border: "none",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "0.5s",
          }}
        >
          <FaSave />
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className="icon-btn edit"
          style={{
            fontSize:'14px',
            background: "#3498db",
            border: "none",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            cursor: "pointer",
            transition: ".5s",
          }}
        >
          <FaEdit />
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="icon-btn delete"
        style={{
          fontSize:'14px',
          background: "#e74c3c",
          border: "none",
          color: "white",
          padding: "5px 15px",
          borderRadius: "20px",
          cursor: "pointer",
          transition: ".5s",
        }}
      >
       <FaTrash />
      </button>
    </div>
  );
}

export default TodoItem;