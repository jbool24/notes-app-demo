import React, { useState, useEffect } from "react";
import { NoteData, Department } from "../notes";
import { useQuery } from "@apollo/client";
import { ALL_DEPARTMENTS_QUERY } from "../../common/queries";

export default function DepartmentsDropdown({ selected, onUpdate }: any) {
  const { loading, error, data } = useQuery(ALL_DEPARTMENTS_QUERY);

  const handleChange = (event: { target: HTMLSelectElement }) => {
    const department = data.departments.find(d => d.id === event.target.value);
    // Update Parent Data on change
    onUpdate(department);
  };

  if (error) {
    return (
      <select
        disabled
        className="w-full h-full px-2 py-1 bg-white border border-gray-400"
      >
        <option>Error</option>
      </select>
    );
  }

  if (loading) {
    return (
      <select
        disabled
        className="w-full h-full px-2 py-1 bg-white border border-gray-400"
      >
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select
      value={selected.id || data.departments[0]}
      onChange={handleChange}
      className="w-full mt-1 px-2 py-1 text-sm leading-5 bg-white border border-gray-400"
    >
      {data.departments.map((d: Department) => {
        return (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        );
      })}
    </select>
  );
}
