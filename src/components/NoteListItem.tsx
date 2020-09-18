import * as React from "react";

export interface Note {
  id: string;
  title: string;
  note_body: string;
  created_at: string;
  department: string;
  department_role: string;
  reviewed: boolean;
}

interface NoteProps {
  note: Note;
}

export const NoteListItem: React.FC<NoteProps> = ({ note }): JSX.Element => {
  console.log(note.created_at);

  return (
    <li className="border-t border-gray-300">
      <a
        href="#"
        className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
              {note.title}
            </div>
            <div className="ml-2 flex-shrink-0 flex">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    note.reviewed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
              >
                {note.reviewed ? "Reviewed" : "Not Reviewed"}
              </span>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                <svg
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                {note.department}
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Created on
                <time dateTime="2020-01-07">
                  {" " +
                    new Intl.DateTimeFormat("en-US").format(
                      new Date(note.created_at)
                    )}
                </time>
              </span>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};
