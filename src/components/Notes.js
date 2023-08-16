import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import NewNote from "./NewNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const ctx = useContext(noteContext);
  const { setNotes, edtNote } = ctx;
  const { notes, getNotes } = ctx;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);
  const ref = useRef(null);
  const refcls = useRef(null);
  const updateNote = (noteCurr) => {
    ref.current.click();
    setNote({
      id: noteCurr._id,
      etitle: noteCurr.title,
      edescription: noteCurr.description,
    });
  };

  const handleClick = (e) => {
    // setNotes(note.title, note.description, note.tag);
    e.preventDefault();

    console.log("clicked");
    edtNote(note.id, note.etitle, note.edescription, note.etag);
    refcls.current.click();
    // setNote({ id:"", etitle: "", edescription: "", etag: "" })
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log("changed");
  };
  return (
    <>
      <NewNote />
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal huihhii
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    aria-describedby="emailHelp"
                  />
                  <div id="etitle" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edesc"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refcls}
              >
                Close
              </button>

              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3>Your notes!</h3>
      {notes.length === 0 && "No Notes"}
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
      })}
    </>
  );
};

export default Notes;
