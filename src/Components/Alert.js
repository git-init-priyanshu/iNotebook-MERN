import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";

export default function Alert(props) {
  // Alert
  const context = useContext(noteContext);
  const { alert } = context;

  // const capitalize = (word) => {
  //   const lower = word.toLowerCase();
  //   return lower.charAt(0).toUpperCase() + lower.slice(1);
  // };
  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alert.type}</strong>
          {alert.msg}
        </div>
      )}
    </div>
  );
}
