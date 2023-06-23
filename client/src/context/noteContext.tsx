import { ReactNode, createContext, useContext, useReducer } from "react";
import { NotesType } from "../types/types";
import notesReducer from "../reducer/noteReducer";

//should initialize as empty array otherwise it comes up in UI and come and go
// const initialNote = {
//   _id: -1,
//   title: "",
//   description: "",
//   tag: "",
// };

const NoteContext = createContext<{
  notes: NotesType[];
  dispatch: React.Dispatch<any>;
}>({
  notes: [],
  dispatch: () => undefined,
});

const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  return (
    <NoteContext.Provider value={{ notes, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

//custom hook
const useNote = () => useContext(NoteContext);

export { NoteProvider, useNote };
