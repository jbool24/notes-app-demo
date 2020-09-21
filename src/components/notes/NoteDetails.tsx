import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouteMatch, Switch, Route } from "react-router-dom";

import { NoteEditable, NoteReadOnly } from "../notes";
import { NOTE_BY_ID_QUERY } from "../../common/queries";

export default function NoteDetails(): JSX.Element {
  const match = useRouteMatch();
  const { noteId } = useParams();

  const { loading, error, data } = useQuery(NOTE_BY_ID_QUERY, {
    variables: { noteId: noteId }
  });

  // On Server Fetch Error
  if (error) {
    console.error(error);
    return <h1 className="w-full text-center"> No note found!</h1>;
  }

  return loading ? (
    <h1 className="w-full text-center"> Loading Note</h1>
  ) : (
    <Switch>
      <Route path={`${match.url}/edit`}>
        <NoteEditable note={data.notes[0]} />
      </Route>

      <Route path={match.url}>
        <NoteReadOnly note={data.notes[0]} />
      </Route>
    </Switch>
  );
}
