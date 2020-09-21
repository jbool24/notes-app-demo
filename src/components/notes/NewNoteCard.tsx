import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Note, Department, DepartmentsDropdown } from "../notes";
import { INSERT_NOTE_MUTATION } from "../../common/queries";

export default function NewNoteCard() {
  const router = useHistory();
  const { user } = useAuth0();
  const [noteData, setNoteData] = useState(
    Note({ author: { name: user.name, email: user.email } })
  );

  const [newNote, { loading: mutationLoading }] = useMutation(
    INSERT_NOTE_MUTATION
  );

  const handleSubmit = async () => {
    // validate
    console.table(noteData);
    // submit
    // try {
    //   await newNote({
    //     variables: {
    //       title: "New Note",
    //       noteBody: noteData.note_body,
    //       departmentId: noteData.department.id,
    //       createdBy: "a8022405-3b56-4ae9-a639-a76f66cd92d4" //user.user_id
    //     }
    //   }).then((data: any) => {
    //     console.log("Recienved data", data);
    //     router.replace(`/notes/all`);
    //   });
    // } catch (error) {
    //   // rollback on errors
    //   console.error(`JB ERROR: ${error}`);
    // }
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
          <div>
            <button
              onClick={handleSubmit}
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={() => router.replace("/notes/all")}
              className="relative inline-flex items-center mx-2 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-gray-700"
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
              Department
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {/*<DepartmentsDropdown onUpdate={updateDepartment} />*/}
              <DepartmentsDropdown
                selected={noteData.department}
                onUpdate={updateDepartment}
              />
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
