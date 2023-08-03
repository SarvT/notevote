import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = ()=> {
  const ctx = useContext(noteContext);
  const { notes, setNotes } = ctx;
  return (
    <>
      <h3>Your notes!</h3>
      {notes.map((note) => {
        return <NoteItem note={note}/>
      })}
    </>
  );
}

export default Notes