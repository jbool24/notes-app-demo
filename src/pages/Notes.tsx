import * as React from "react";
import { useQuery, gql } from "@apollo/client";

import { NoteList } from "../components/NoteList";

const ALL_NOTES_QUERY = gql`
  query allNotesQuery {
    user_notes {
      id
      title
      created_at
      note_body
      reviewed
      department_role
      department
    }
  }
`;

const DEFAULT_NOTE = {
  id: "12345",
  title: "A Good Note",
  noteBody: "Hello WOrld",
  createdOn: new Date().toLocaleString()
};

export default function NotePage(): JSX.Element {
  const { loading, data } = useQuery(ALL_NOTES_QUERY);

  if (!loading) console.log(data.user_notes);

  if (loading) return <h1 className="text-4xl">LOADING...</h1>;
  else return <NoteList notes={data.user_notes} />;
}
