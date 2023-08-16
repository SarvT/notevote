import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NewNote() {
  const ctx = useContext(noteContext);
  const { setNotes } = ctx;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
      e.preventDefault();
      setNotes(note.title, note.description, note.tag);
      console.log("clicked");
      setNote({ title: "", description: "", tag: "" })
    };
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
      console.log("changed");
    };

  return (
    <div className="container my-3">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={note.title} 
            name="title"
            onChange={onChange}
            aria-describedby="emailHelp"
            />
          <div id="title" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={note.description} 
            className="form-control"
            id="desc"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Tag
          </label>
          <input
            type="text"
            value={note.tag} 
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
       
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}
