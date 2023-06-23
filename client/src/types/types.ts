import {
  AUTH_REDUCER_ACTION_TYPE,
  NOTES_REDUCER_ACTION_TYPE,
  THEME_REDUCER_ACTION_TYPE,
} from "./enum";

//authType
export type AuthType = {
  isLoggedIn: boolean;
  token: string | null;
};

//ONE WAY
// remove this inside  union by decalring individual types of action
// type AuthActionType = {
//   type: REDUCER_ACTION_TYPE.LOGIN | REDUCER_ACTION_TYPE.LOGOUT
//   payload: string;
// };

//OTHER WAY
type LoginActionType = {
  type: AUTH_REDUCER_ACTION_TYPE.LOGIN;
  payload: string;
};

type LogoutActionType = {
  type: AUTH_REDUCER_ACTION_TYPE.LOGOUT;
};

export type AuthActionType = LoginActionType | LogoutActionType;

//notesType
export type NotesType = {
  _id: number;
  title: string;
  description: string;
  tag: string;
};

type ADD_ACTION_TYPE = {
  type: NOTES_REDUCER_ACTION_TYPE.ADD_NOTE;
  payload: NotesType;
};

type FETCH_ACTION_TYPE = {
  type: NOTES_REDUCER_ACTION_TYPE.FETCH_NOTES;
  payload: NotesType[];
};

type UPDATE_ACTION_TYPE = {
  type: NOTES_REDUCER_ACTION_TYPE.UPDATE_NOTE;
  payload: NotesType;
};

type DELETE_ACTION_TYPE = {
  type: NOTES_REDUCER_ACTION_TYPE.DELETE_NOTE;
  payload: number;
};

export type NoteActionType =
  | ADD_ACTION_TYPE
  | FETCH_ACTION_TYPE
  | UPDATE_ACTION_TYPE
  | DELETE_ACTION_TYPE;

export type EditNoteType = (currentNote: NotesType) => void;

//alert
type ShowAlertType = (message: string, type: string) => void;

export type ShowAlertProps = {
  showAlert: ShowAlertType;
};

export type AlertType = {
  msg: string;
  type: string;
} | null;

export type NoteItemProps = {
  note: NotesType;
  editNote: EditNoteType;
  showAlert: ShowAlertType;
};

export type NotesListProps = {
  editNote: EditNoteType;
  showAlert: ShowAlertType;
};

//theme

export type ThemeType = {
  mode: string;
};
export type ThemeActionType = {
  type: THEME_REDUCER_ACTION_TYPE.TOGGLE_THEME;
};
