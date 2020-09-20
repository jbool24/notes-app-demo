export { default as NoteDetails } from "./NoteDetails";
export { default as NoteEditable } from "./NoteEditable";
export { default as NoteReadOnly } from "./NoteReadOnly";
export { default as NoteList } from "./NoteList";
export { default as NoteListItem } from "./NoteListItem";
export { default as NewNoteCard } from "./NewNoteCard";
export { default as DepartmentsDropdown } from "./DepartmentsDropdown";

export type Department = {
  id: string;
  name: string;
};

export interface NoteData {
  id?: string;
  title: string;
  author: any;
  note_body: string;
  created_at: string;
  department: Department;
  department_role?: string;
  reviewed: boolean;
}

export function Note(data: NoteData) {
  return {
    id: "",
    title: "New Note",
    reviewed: false,
    author: {},
    note_body: "",
    created_at: "",
    department: "",
    ...data
  };
}
