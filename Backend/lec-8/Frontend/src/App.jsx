import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([
    {
      title: "Test 1",
      content: "This is a test"
    },
    {
      title: "Test 2",
      content: "This is a test"
    },
    {
      title: "Test 3",
      content: "This is a test"
    },
    {
      title: "Test 4",
      content: "This is a test"
    }
  ]);

  axios.get("http://localhost:3000/notes")
    .then((response) => {
      // console.log(response.data);
      setNotes(response.data.notes);
    });

  return (
    <>
      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default App