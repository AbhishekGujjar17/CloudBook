import { ShowAlertProps } from "../types/types";
import AddNote from "./AddNote";
import Notes from "./Notes";

export const Home = ({ showAlert }: ShowAlertProps) => {
  return (
    <div className="container">
      <AddNote showAlert={showAlert} />
      <Notes showAlert={showAlert} />
    </div>
  );
};
export default Home;
