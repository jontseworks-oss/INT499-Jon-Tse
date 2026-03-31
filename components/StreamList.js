import { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

function StreamList() {
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("streamlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("streamlist", JSON.stringify(list));
  }, [list]);

  const handleAdd = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex].text = input;
      setList(updatedList);
      setEditIndex(null);
    } else {
      setList([...list, { text: input, completed: false }]);
    }
// Add this near your Add/Update button in StreamList.js
{editIndex !== null && (
  <button 
    onClick={() => { setEditIndex(null); setInput(""); }} 
    style={{ marginLeft: "5px", backgroundColor: "#ef4444" }}
  >
    Cancel
  </button>
)}
    setInput("");
  };

  const handleDelete = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const handleComplete = (index) => {
    const updatedList = [...list];
    updatedList[index].completed = !updatedList[index].completed;
    setList(updatedList);
  };

  const handleEdit = (index) => {
    setInput(list[index].text);
    setEditIndex(index);
  };

  const handleClearAll = () => {
    setList([]);
  };

  return (
    <div className="streamlist-container">
      <h1>My Streaming List</h1>

      <input
        type="text"
        placeholder="Enter movie/show"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleAdd}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <button onClick={handleClearAll} style={{ marginLeft: "10px" }}>
        Clear All
      </button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                color: item.completed ? "gray" : "black",
                marginRight: "10px",
              }}
            >
              {item.text}
            </span>

            <div style={{ display: "inline", marginLeft: "10px" }}>
              <button onClick={() => handleComplete(index)}>
                <FaCheck />
              </button>

              <button
                onClick={() => handleEdit(index)}
                style={{ marginLeft: "5px" }}
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(index)}
                style={{ marginLeft: "5px" }}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;