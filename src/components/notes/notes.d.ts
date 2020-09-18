declare type Department = {
  id: string;
  department_name: string;
};

declare type Note = {
  id: string;
  title: string;
  note_body: string;
  created_at: string;
  department: Department;
  department_role: string;
  reviewed: boolean;
};

export { Note, Department };
