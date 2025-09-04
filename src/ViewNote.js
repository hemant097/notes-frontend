import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function ViewNote() {
  const { token } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://notes-app-backend-34154ef4c3d1.herokuapp.com/api/notes/share/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Note not found");
        return res.json();
      })
      .then((data) => setNote(data))
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) {
    return (
      <div className="container">
        <div className="note-card error-card">
          <h2>❌ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container">
        <p className="loading">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="note-card view-card">
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </div>
  );
}

export default ViewNote;
