import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const ctx = useContext(noteContext);
  const { deleteNote } = ctx;
  const { note, updateNote } = props;
  return (
    <div className="card md-3 ">
      {/* <div className="d-flex"> */}
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-text">{note.description}</h6>
          <p className="card-text small">{note.tag}</p>
          <i className="fa-solid fa-check mx-2"></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          {/* <button onClick={()=>deleteNote({id})}>Delete</button> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default NoteItem;
