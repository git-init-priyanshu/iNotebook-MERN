import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edesc: currentNote.desc,
      etag: currentNote.tag,
    });
  };

  const ref = useRef();
  const refClose = useRef();

  const [note, setNote] = useState({ id: "", etitle: "", edesc: "", etag: "" });

  const handleOnClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edesc, note.etag);
    refClose.current.click();
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container row div-center w-95 my-3">
      <AddNote />

      {/* This button is not being displayed but if has been set as a reference(useRef()) */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                ref={refClose}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* from */}
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter title here"
                    onChange={handleOnChange}
                    required
                    minLength={3}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text"
                    value={note.edesc}
                    className="form-control"
                    id="edesc"
                    name="edesc"
                    placeholder="Enter description here"
                    onChange={handleOnChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="desc">Tag</label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter Tag here"
                    onChange={handleOnChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnClick}
                disabled={note.etitle.length < 3 || note.edesc.length < 5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="container">
        {notes.length === 0 && "No notes to display"}
      </div>
      {notes.map((note) => {
        // console.log("note", note);
        return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
      })}
    </div>
  );
}
