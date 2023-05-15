import React from "react";
import Navbar from "./Navbar";
// import noteContext from "../Context/notes/NoteContext";
import Notes from "./Notes";
// import AddNote from "./AddNote";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container my-3"></div>
      <Notes />
    </>
  );
}
