import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  gql,
  DataProxy,
  FetchResult
} from "@apollo/client";
import { useHistory } from "react-router-dom";

import { NoteData, Department, DepartmentsDropdown } from "../notes";
import {
  ALL_DEPARTMENTS_QUERY,
  UPDATE_NOTE_MUTATION
} from "../../common/queries";

interface NoteProps {
  note: NoteData;
}

export default function NoteEditable({ note }: NoteProps): JSX.Element {
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

  const handleSubmit = async () => {
    try {
      await updateNote({
        variables: {
          id: noteData.id,
          title: noteData.title,
          noteBody: noteData.note_body,
          departmentId: noteData.department.id
        }
      });
      router.push(`/notes/note/${noteData.id}`);
    } catch (error) {
      console.error(`UPDATE NOTE ERROR: ${error}`);
    }
  };

  const handleUpdateTitle = (event: any) => {
    setNoteData({ ...noteData, title: event.target.value });
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
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="btn px-2 w-1/2 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={() => router.goBack()}
              className="btn px-2 btn-gray w-1/2 ml-2 hover:bg-gray-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-gray-700"
            >
              Cancel
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
              Title
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              <input
                id="title"
                value={noteData.title}
                onChange={handleUpdateTitle}
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
