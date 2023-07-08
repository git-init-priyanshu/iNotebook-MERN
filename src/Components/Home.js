import React from "react";
import Navbar from "./Navbar";
// import noteContext from "../Context/notes/NoteContext";
import Notes from "./Notes";
import Sidebar from "./Sidebar";
// import AddNote from "./AddNote";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="d-flex">
        <Sidebar />
        <div className=""></div>
        <Notes />
      </div>
    </>
  );
}
