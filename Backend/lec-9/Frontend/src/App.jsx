import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await axios.get("https://cohort-2-0-cswr.onrender.com//notes");
      setNotes(response.data.notes);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      console.log("Both fields required");
      return;
    }
    try {
      await axios.post("https://cohort-2-0-cswr.onrender.com//notes", {
        title,
        content
      });
      fetchNotes();
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cohort-2-0-cswr.onrender.com/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`https://cohort-2-0-cswr.onrender.com/notes/${id}`, {
        title,
        content
      });
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <div className="buttons">
              <button onClick={() => handleDelete(note._id)}>Delete</button>
              <button onClick={() => handleUpdate(note._id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App