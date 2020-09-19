import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { Note, NoteList, NoteCard } from "../components/notes";

const ALL_NOTES_QUERY = gql`
  query AllNotesQuery {
    notes {
      id
      title
      created_at
      reviewed
      department_role
      department {
        id
        name
      }
    }
  }
`;

export default function NotePage() {
  const { loading, data, error } = useQuery(ALL_NOTES_QUERY);

  if (error) {
    console.error(error);
    return (
      <h1 className="text-center text-gray-600 text-2xl py-4 h-20">
        There was an error. Try refreshing the page.
      </h1>
    );
  }

  if (loading)
    return (
      <h1 className="text-center text-gray-600 text-2xl py-4 h-20">
        Loading Notes...
      </h1>
    );
  else
    return (
      <Switch>
        <Route path={`/notes/:noteId`}>
          <NoteCard />
        </Route>
        <Route path="/notes" exact>
          <NoteList notes={data.notes} />
        </Route>
      </Switch>
    );
}
