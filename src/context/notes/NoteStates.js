import { useState } from "react";
import NoteContext from "./noteContext";
// import axios from "axios";

const NoteState = (props) => {
  // const s1 = {
  //   name: "Samee",
  //   class: "TE-A",
  // };
  // const [state, setState] = useState(s1);
  // const update = () => {
  //   setTimeout(() => {
  //     setState({
  //       name: "Samee San",
  //       class: "BE-A",
  //     }, );
  //   },1000);
  // };
  const notesIni = [];
  const [notes, setNote] = useState(notesIni);
  const hostname = "http://localhost:5000";

  const getNotes = async () => {
    const response = await fetch(`${hostname}/api/notes/notesall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json()
    setNote(json)
  };
  const setNotes = async (title, description, tag) => {
    // const note = {
    //   _id: "64c69314e61d8367d6579388",
    //   user: "64c531b89d27f86d11457d74",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-07-30T16:43:00.116Z",
    //   __v: 0,
    // };

    const response = await fetch(`${hostname}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const jsonRes = await response.json()
    const note = jsonRes
    setNote(notes.concat(note))
    // setNote(notes.concat(note));
  };
  const deleteNote = async (id) => {


    const updatedNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(updatedNotes);

    // const response = 
    await fetch(`${hostname}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    // const resJson = response.json();
    // console.log(resJson);
  };
  
  const edtNote = async (id, title, description, tag) => {
    const response = await fetch(`${hostname}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const resJson = response.json();
    console.log(resJson);
    // return response.json();
    let newNt = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNt.length; index++) {
      const ele = newNt[index];
      if (ele._id === id) {
        newNt[index].title = title;
        newNt[index].description = description;
        newNt[index].tag = tag;
        break;
      }
    }
    setNote(newNt)
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, deleteNote, edtNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
