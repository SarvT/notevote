import { useState } from "react";
import NoteContext from "./noteContext";

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
  const notesIni = [
    
      {
        "_id": "64c69314e61d8367d6579388",
        "user": "64c531b89d27f86d11457d74",
        "title": "Do homework!",
        "description": "do math's homework, solve 5 problems.",
        "tag": "study",
        "date": "2023-07-30T16:43:00.116Z",
        "__v": 0
      },
      {
        "_id": "64c69314e61d8367d657938a",
        "user": "64c531b89d27f86d11457d74",
        "title": "Do homework!",
        "description": "do math's homework, solve 5 problems.",
        "tag": "study",
        "date": "2023-07-30T16:43:00.268Z",
        "__v": 0
      },
      {
        "_id": "64c69314e61d8367d657938c",
        "user": "64c531b89d27f86d11457d74",
        "title": "Do homework!",
        "description": "do math's homework, solve 5 problems.",
        "tag": "study",
        "date": "2023-07-30T16:43:00.453Z",
        "__v": 0
      },
      {
        "_id": "64c69314e61d8367d657938e",
        "user": "64c531b89d27f86d11457d74",
        "title": "Do homework!",
        "description": "do math's homework, solve 5 problems.",
        "tag": "study",
        "date": "2023-07-30T16:43:00.609Z",
        "__v": 0
      },
      {
        "_id": "64c69314e61d8367d6579390",
        "user": "64c531b89d27f86d11457d74",
        "title": "Do homework!",
        "description": "do math's homework, solve 5 problems.",
        "tag": "study",
        "date": "2023-07-30T16:43:00.843Z",
        "__v": 0
      }
    
  ]
  const [notes, setNotes] = useState(notesIni)
  return (
    <NoteContext.Provider value={{notes ,setNotes}}>
      {props.children}
      </NoteContext.Provider>
  );
};

export default NoteState;
