import * as React from "react";
import { Note, NoteListItem } from "./NoteListItem";

interface PropList {
  notes: Array<Note>;
}

export function NoteList(props: PropList): JSX.Element {
  return (
    <div>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Posted Notes
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
              >
                New Note
              </button>
            </span>
          </div>
        </div>
      </div>
      <ul>
        {props.notes.map(note => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}
