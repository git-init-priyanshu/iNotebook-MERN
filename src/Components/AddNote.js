import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.desc, note.tag);
    setNote({ title: "", desc: "", tag: "" });
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Add a Note</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title here"
            onChange={handleOnChange}
            value={note.title}
            required
            minLength={3}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="desc"
            placeholder="Enter description here"
            onChange={handleOnChange}
            value={note.desc}
            required
            minLength={5}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="desc">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter Tag here"
            onChange={handleOnChange}
            value={note.tag}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-2"
          onClick={handleOnClick}
          disabled={note.title.length < 3 || note.desc.length < 5}
        >
          Add Note
        </button>
      </form>
      <hr />
    </div>
  );
}
