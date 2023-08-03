import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    
      <div class="card" >
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">{note.description}</p>
          {/* <button onClick={()=>deleteNote({id})}>Delete</button> */}
        </div>
    
      
    </div>
  );
};

export default NoteItem;
