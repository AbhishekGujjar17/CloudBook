import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

export const Home = (props) => {
  const { showAlert } = props;
  return (
    <div className="container">
      <AddNote showAlert={showAlert} />
      <Notes showAlert={showAlert} />
    </div>
  );
};
export default Home;
