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

export function Note(data = {}) {
  return {
    id: "0",
    title: "New Note",
    reviewed: false,
    author: {
      name: "Jon Doe",
      email: "email@example.com"
    },
    note_body: "",
    created_at: "",
    department: {
      id: "40037e36-5206-4a1e-8b57-5eaffee64c0e",
      name: "Management"
    },
    ...data
  };
}
