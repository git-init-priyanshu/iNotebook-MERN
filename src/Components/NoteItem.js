import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.desc}</p>
          <i
            className="far fa-trash-alt mx-2"
            onClick={() => deleteNote(props.note._id)}
          ></i>
          <i
            className="far fa-edit mx-2"
            onClick={() => {
              props.updateNote(props.note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
