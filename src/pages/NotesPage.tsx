import * as React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

// import { useSubscription } from "@apollo/react-hooks";
import { NoteList, NoteDetails, NewNoteCard } from "../components/notes";

import { ALL_NOTES_QUERY, SUBSCRIBE_TO_NOTES } from "../common/queries";

export default function NotesPage() {
  const { loading, data, error } = useQuery(ALL_NOTES_QUERY);

  if (error) {
    console.error(error.message);

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
