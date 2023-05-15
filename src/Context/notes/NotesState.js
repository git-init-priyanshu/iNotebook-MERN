import NoteContext from "./NoteContext";
import { React, useState } from "react";

const NoteState = (props) => {
  // alert
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => [
    setAlert({ msg, type }),
    setTimeout(() => {
      setAlert(null);
    }, 1500),
  ];

  const host = "http://localhost:5000/";

  const [notes, setNotes] = useState([]);

  // fetching all notes
  const fetchNotes = async () => {
    const notesArr = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjNmNWFkMzdhYzg0M2I1NDY0ZDYxIn0sImlhdCI6MTY4Mzk3OTM4MX0.fLWs1ancIsW8pOE3xUXBDXAdmHqKOPc6smc5WyLtikg",
      },
    });
    const json = await notesArr.json();
    setNotes(notes.concat(json));
  };

  // Add note
  const addNote = async (title, desc, tag) => {
    // for backend
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title: title, desc: desc, tag: tag }),
    });

    // for frontend
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete note
  const deleteNote = async (noteId) => {
    // for backend
    await fetch(`${host}api/notes/deletenote/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    // for frontend
    const newNotes = notes.filter((note) => {
      return note._id !== noteId;
    });
    setNotes(newNotes);
  };

  // Edit note
  const editNote = async (noteId, noteTitle, noteDesc, noteTag) => {
    // API call
    await fetch(`${host}api/notes/updatenote/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title: noteTitle, desc: noteDesc, tag: noteTag }),
    });

    // for frontend
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === noteId) {
        newNotes[index].title = noteTitle;
        newNotes[index].desc = noteDesc;
        newNotes[index].tag = noteTag;
        break;
      }
      setNotes(newNotes);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        showAlert,
        alert,
        notes,
        fetchNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
