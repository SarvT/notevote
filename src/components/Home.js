import Navbar from "./Navbar";
import Notes from "./Notes";

export default function Home(props) {
  return (
    <div>
      <h2>Add Notes!</h2>

      <Notes showAlert={props.showAlert}/>
    </div>
  );
}
