import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://cohort-2-0-cswr.onrender.com";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= FETCH NOTES =================
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}/notes`);

      // Handle both possible backend formats
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.notes;

      if (!Array.isArray(data)) {
        throw new Error("Invalid notes format from server");
      }

      setNotes(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ================= CREATE NOTE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Both fields required");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/notes`, {
        title,
        content,
      });

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // ================= DELETE NOTE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= UPDATE NOTE =================
  const handleUpdate = async (id) => {
    if (!title.trim() || !content.trim()) {
      alert("Enter updated title and content first");
      return;
    }

    try {
      await axios.patch(`${BASE_URL}/notes/${id}`, {
        title,
        content,
      });

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <>
      <h2>Notes App</h2>

      <form className="create-note" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Create Note</button>
      </form>

      {loading && <p>Loading notes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="notes">
        {Array.isArray(notes) &&
          notes.map((note) => (
            <div className="note" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <div className="buttons">
                <button onClick={() => handleDelete(note._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdate(note._id)}>
                  Update
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default App;