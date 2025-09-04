import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", content: "" });

  const API_URL = "http://localhost:8080/api/notes";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note.id) {
      await axios.put(`${API_URL}/${note.id}`, note);
    } else {
      await axios.post(API_URL, note);
    }
    setNote({ title: "", content: "" });
    fetchNotes();
  };

  const handleEdit = (n) => setNote(n);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchNotes();
  };

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        ></textarea>
        <button type="submit">{note.id ? "Update Note" : "Add Note"}</button>
      </form>

      <div className="notes-list">
        {notes.map((n) => (
          <div key={n.id} className="note-card">
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(n)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(n.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
