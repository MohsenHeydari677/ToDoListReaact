import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    onAddTodo(text);
    setText("");
  };
  return (
    <form
      onSubmit={handlesubmit}
      style={{ display: "flex", justifyContent: "center", gap: "10px" }}
    >
      <input
        style={{
          paddingLeft:'10px',
          borderRadius: "20px",
          border: "1px solid #000",
          width: "265px",
          height: "28px",
        }}
        type="text"
        placeholder="Add New Task ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="ADbtn"
        style={{
          padding: "5px 20px ",
          borderRadius: "20px",
          border: "1px solid #000",
          position: "absolute",
          right: "268px",
          top: "100.6px",
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
