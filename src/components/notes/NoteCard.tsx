import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Note, Department } from "./";

const ALL_DEPARTMENTS_QUERY = gql`
  query allDepartmentsQuery {
    departments {
      id
      department_name
    }
  }
`;

interface NoteCardProps {
  notes: Array<Note>;
}

export function NoteCard(props: NoteCardProps): JSX.Element {
  const { noteId } = useParams();
  const match = useRouteMatch();
  const note = props.notes.find(note => note.id === noteId);
  console.log(note);

  if (!note) return <h1> Note note foundM</h1>;
  else
    return (
      <Switch>
        <Route path={`${match.url}/edit`}>
          <EditableNoteCard note={note} />
        </Route>
        <Route path={match.url}>
          <ReadOnlyNoteCard note={note} />
        </Route>
      </Switch>
    );
}

interface NoteCardProps {
  note: Note;
}

function ReadOnlyNoteCard({
  note: { department, note_body }
}: NoteCardProps): JSX.Element {
  const match = useRouteMatch();
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
          <div>
            <Link
              to={`${match.url}/edit`}
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
            >
              Edit
            </Link>
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
              Margot Foster
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Department
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {department}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              margotfoster@example.com
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              About
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {note_body}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function DepartmentsDropdown(): JSX.Element {
  const { loading, data } = useQuery(ALL_DEPARTMENTS_QUERY);
  if (loading)
    return (
      <select disabled>
        <option>Loading...</option>
      </select>
    );
  else
    return (
      <select>
        {data.departments.map(
          (department: Department): JSX.Element => (
            <option key="department.id">department.department_name</option>
          )
        )}
      </select>
    );
}

function EditableNoteCard({ note }: NoteCardProps): JSX.Element {
  const noteData: Note = {
    id: note.id || "",
    title: note.title || "",
    note_body: note.note_body || "",
    department: note.department || {},
    department_role: note.department_role || "",
    created_at: note.created_at || "",
    reviewed: note.reviewed || false
  };

  const valueChanged = (event: { target: HTMLInputElement }) => {
    console.log("Heard Value Change");
    console.log(event);
  };

  return (
    <div className="bg-white overflow-hidden sm:rounded-lg">
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
          <div>
            <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="w-full text-sm leading-5 font-medium text-gray-500">
              Full name
            </dt>
            <dd>
              <input
                id="author"
                className="w-full px-2 py-1 mt-1 text-sm leading-5 text-gray-900 border border-gray-400 shadow-inner"
                placeholder="John Smith"
                value={noteData.title}
              />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Department
            </dt>
            <dd>
              <DepartmentsDropdown onChange={valueChanged} />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              <input
                id="author"
                className="w-full px-2 py-1 mt-1 text-sm leading-5 text-gray-900 border border-gray-400 shadow-inner"
                placeholder="john.smith@example.com"
              />
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Note
            </dt>
            <dd className="mt-1 tex-sm leading-5 text-gray-900">
              <input
                id="author"
                type="textarea"
                className="w-full px-2 py-1 mt-1 text-sm leading-5 text-gray-900 border border-gray-400 shadow-inner "
              />
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
