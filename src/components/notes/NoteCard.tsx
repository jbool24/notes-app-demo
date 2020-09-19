import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  useParams,
  useRouteMatch,
  useHistory,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Note, Department } from "../notes";

const ALL_DEPARTMENTS_QUERY = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`;

const NOTE_BY_ID_QUERY = gql`
  query Note($noteId: uuid!) {
    notes(where: { id: { _eq: $noteId } }) {
      id
      title
      created_at
      author {
        id
        name
        email
      }
      note_body
      reviewed
      department_role
      department {
        id
        name
      }
    }
  }
`;

const UPDATE_NOTE_MUTATION = gql`
  mutation updateNote($id: uuid!, $noteBody: String, $departmentId: uuid) {
    update_notes_by_pk(
      pk_columns: { id: $id }
      _set: { note_body: $noteBody, department_id: $departmentId }
    ) {
      department_id
      modified_at
      note_body
    }
  }
`;

export default function NoteCard(): JSX.Element {
  const match = useRouteMatch();
  const { noteId } = useParams();

  const { loading, error, data } = useQuery(NOTE_BY_ID_QUERY, {
    variables: { noteId: noteId }
  });

  // Some Server Error
  if (error) {
    return <h1 className="w-full text-center"> Note note found!</h1>;
  }

  return loading ? (
    <h1 className="w-full text-center"> Loading Note</h1>
  ) : (
    <Switch>
      <Route path={`${match.url}/edit`}>
        <EditableNoteCard note={data.notes[0]} />
      </Route>
      <Route path={match.url}>
        <ReadOnlyNoteCard note={data.notes[0]} />
      </Route>
    </Switch>
  );
}

interface NoteProps {
  note: Note;
}

function ReadOnlyNoteCard({ note }: NoteProps): JSX.Element {
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

interface DropDownProps {
  selected: Department;
  departments: Array<Department>;
  onUpdate(d: Department): void;
}
function DepartmentsDropdown({
  selected,
  departments,
  onUpdate
}: DropDownProps) {
  const handleChange = (event: { target: HTMLSelectElement }) => {
    const selected = departments.find((d: any) => event.target.value === d.id);
    if (selected) onUpdate(selected);
  };

  return (
    <select
      value={selected.id}
      onChange={handleChange}
      className="w-full h-full px-2 py-1 bg-white border border-gray-400"
    >
      {departments.map((d: Department) => {
        return (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        );
      })}
    </select>
  );
}

function EditableNoteCard({ note }: NoteProps): JSX.Element {
  const router = useHistory();
  const [noteData, setNoteData] = useState(note);
  const { loading: queryLoading, error: queryError, data } = useQuery(
    ALL_DEPARTMENTS_QUERY
  );
  const [
    updateNote,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_NOTE_MUTATION);

  const DropDown = () => {
    if (queryError) {
      return (
        <select disabled>
          <option>Error</option>
        </select>
      );
    }

    if (queryLoading) {
      return (
        <select disabled>
          <option>Loading...</option>
        </select>
      );
    } else {
      return (
        <DepartmentsDropdown
          selected={noteData.department}
          departments={data.departments}
          onUpdate={updateDepartment}
        />
      );
    }
  };

  // const successCB = data => router.push(`/notes/${data.notes.id}`);

  const handleSubmit = async () => {
    console.table(noteData);
    // validate
    router.push(`/notes/${noteData.id}`);
    // submit
    try {
      await updateNote({
        variables: {
          id: noteData.id,
          noteBody: noteData.note_body,
          departmentId: noteData.department.id
        }
      });
    } catch (error) {
      // rollback on errors
      console.error(`JB ERROR: ${error}`);
    }
  };
  const updateNoteText = (event: any) => {
    setNoteData({ ...noteData, note_body: event.target.value });
  };

  const updateDepartment = (department: Department) => {
    setNoteData({ ...noteData, department: department });
  };

  const handleUpdateAuthorEmail = (event: any) => {
    console.log(event.target.id);
    setNoteData({
      ...noteData,
      author: { ...noteData.author, email: event.target.value }
    });
  };
  const handleUpdateAuthorName = (event: any) => {
    console.log(event.target.id);
    setNoteData({
      ...noteData,
      author: { ...noteData.author, name: event.target.value }
    });
  };
  const handleUpdateInput = (event: any) => {
    console.log(event.target.id);
    // setNoteData({...noteData, noteDate[eve]})
  };

  return mutationLoading ? (
    <div>Loading...</div>
  ) : (
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
            <button
              onClick={handleSubmit}
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
            >
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
                id="author.name"
                value={noteData.author.name}
                onChange={handleUpdateAuthorName}
                className="w-full px-2 py-1 mt-1 text-sm leading-5 text-gray-900 border border-gray-400 shadow-inner"
                placeholder="John Smith"
              />
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Email address
            </dt>
            <dd>
              <input
                id="author.email"
                value={noteData.author.email}
                onChange={handleUpdateAuthorEmail}
                className="w-full px-2 py-1 mt-1 text-sm leading-5 text-gray-900 border border-gray-400 shadow-inner"
                placeholder="john.smith@example.com"
              />
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Department
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              <DropDown />
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Note
            </dt>
            <dd className="mt-1 tex-sm leading-5 text-gray-900">
              <textarea
                id="noteText"
                value={noteData.note_body}
                onChange={updateNoteText}
                className="w-full px-2 py-1 mt-1 text-sm leading-5 text-gray-900 border border-gray-400 shadow-inner"
                style={{ minHeight: "120px" }}
              />
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
