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
  return (
    <NoteContext.Provider value={""}>
      {props.children}
      </NoteContext.Provider>
  );
};

export default NoteState;
