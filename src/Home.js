import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  //creates a state variable notes(array) to hold all notes, setNotes is a function to update the notes array
  //react connection uses the useState hook to manage state
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", content: "" });

  //backend api url
  const API_URL = "https://notes-app-backend-34154ef4c3d1.herokuapp.com/api/notes";


  //loads for the first time
  useEffect(() => {
    fetchNotes();
  }, []);

  /*defines an async function to fetch notes from the backend, uses axios to send a GET req to API
  updates the notes state with the data received from the backend*/
  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };


  //to submit a note
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

  //to edit the current note
  const handleEdit = (n) => setNote(n);

  //to delete a note
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchNotes();
  };

  //to share a note, generates a shareable link for the note, uses the shareToken received from the backend for each note
  const handleShare = (note) => {
  const shareUrl = `${window.location.origin}/view/${note.shareToken}`;
  navigator.clipboard.writeText(shareUrl);
  alert("Shareable link copied to clipboard:\n" + shareUrl);
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
            <button className="edit" onClick={() => handleEdit(n)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(n.id)}>Delete</button>
            <button className="share" onClick={() => handleShare(n)}>Share</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;