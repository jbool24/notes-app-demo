export { default as NoteCard } from "./NoteCard";
export { default as NoteList } from "./NoteList";
export { default as NoteListItem } from "./NoteListItem";

export type Department = {
  id: string;
  name: string;
};

export type Note = {
  id: string;
  title: string;
  author: any;
  note_body: string;
  created_at: string;
  department: Department;
  department_role: string;
  reviewed: boolean;
};
