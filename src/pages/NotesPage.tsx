import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { NoteList, NoteDetails, NewNoteCard } from "../components/notes";

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

export default function NotesPage() {
  const { loading, data, error } = useQuery(ALL_NOTES_QUERY);

  if (error) {
    console.error(error);
    return (
      <div className="py-2 bg-white rounded-lg shadow-lg h-full">
        <h1 className="text-center text-gray-600 text-2xl py-4 h-20">
          There was an error. Try refreshing the page.
        </h1>
      </div>
    );
  }

  return (
    <div className="py-2 bg-white rounded-lg shadow-lg h-full">
      {loading ? (
        <h1 className="text-center text-gray-600 text-2xl py-4 h-20">
          Loading Notes...
        </h1>
      ) : (
        <Switch>
          <Route path="/notes/new" exact>
            <NewNoteCard />
          </Route>

          <Route path="/notes/all" exact>
            <NoteList notes={data.notes} />
          </Route>

          <Route path={`/notes/note/:noteId`}>
            <NoteDetails />
          </Route>
        </Switch>
      )}
    </div>
  );
}
