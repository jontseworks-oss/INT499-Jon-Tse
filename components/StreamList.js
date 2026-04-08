import { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

function StreamList() {
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("streamlist");
    return saved ? JSON.parse(saved) : [];
  });

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

    setInput("");
  };

  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleComplete = (index) => {
    const updated = [...list];
    updated[index].completed = !updated[index].completed;
    setList(updated);
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

      {editIndex !== null && (
        <button
          onClick={() => {
            setEditIndex(null);
            setInput("");
          }}
          style={{ marginLeft: "5px", backgroundColor: "#ef4444" }}
        >
          Cancel
        </button>
      )}

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
              }}
            >
              {item.text}
            </span>

            <div>
              <button onClick={() => handleComplete(index)}>
                <FaCheck />
              </button>

              <button onClick={() => handleEdit(index)}>
                <FaEdit />
              </button>

              <button onClick={() => handleDelete(index)}>
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
