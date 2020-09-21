import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { REMOVE_NOTE_MUTATION } from "../../common/queries";
import { NoteData } from "../notes";

interface NoteProps {
  note: NoteData;
}

export default function NoteReadOnly({ note }: NoteProps): JSX.Element {
  const router = useHistory();
  const match = useRouteMatch();
  const { user } = useAuth0();
  const [removeNote, { error }] = useMutation(REMOVE_NOTE_MUTATION);

  const userAllowed = user && user.sub && user.sub === note.author.user_id;
  useEffect(() => {
    console.log(user);
    console.log(note);
  });

  const handleDelete = async () => {
    try {
      await removeNote({
        variables: {
          id: note.id
        }
      });
      router.replace(`/notes/all`);
    } catch (error) {
      console.error(`REMOVE NOTE ERROR: ${error}`);
    }
  };

  return (
    <div className="bg-white overow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="flex justify-betwen">
          <div className="flex-grow">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Work Note Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
              Note details and information.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={!userAllowed}
              onClick={() => {
                router.push(`${match.url}/edit`);
              }}
              title={true ? "Edit the note" : "Only the author may update"}
              className="btn px-4 w-1/2 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
            >
              Edit
            </button>
            <button
              onClick={() => router.replace("/notes/all")}
              className="btn px-4 btn-gray w-1/2 ml-2 hover:bg-gray-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-gray-700"
            >
              Back
            </button>
            <button
              disabled={!userAllowed}
              onClick={handleDelete}
              className="btn btn-red p-4 mt-2 ml-2 flex items-center text-sm leading-5 text-gray-400"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {note.author.name}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {note.author.email}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Title
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {note.title}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Department
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {note.department.name}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Note
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {note.note_body}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
