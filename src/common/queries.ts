import { gql } from "@apollo/client";

export const ALL_DEPARTMENTS_QUERY = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`;

export const ALL_NOTES_QUERY = gql`
  query AllNotesQuery {
    notes {
      id
      title
      created_at
      reviewed
      department_role
      department {
        id
        name
      }
    }
  }
`;

export const SUBSCRIBE_TO_NOTES = gql`
  subscription {
    notes {
      id
      title
      created_at
      reviewed
      department_role
      department {
        id
        name
      }
    }
  }
`;

export const NOTE_BY_ID_QUERY = gql`
  query Note($noteId: uuid!) {
    notes(where: { id: { _eq: $noteId } }) {
      id
      title
      created_at
      author {
        id
        user_id
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

export const UPDATE_NOTE_MUTATION = gql`
  mutation updateNote(
    $id: uuid!
    $title: String!
    $noteBody: String
    $departmentId: uuid
  ) {
    update_notes_by_pk(
      pk_columns: { id: $id }
      _set: {
        title: $title
        note_body: $noteBody
        department_id: $departmentId
      }
    ) {
      id
      title
      department {
        id
        name
      }
      note_body
    }
  }
`;

export const INSERT_NOTE_MUTATION = gql`
  mutation insertNote(
    $title: String!
    $noteBody: String
    $createdBy: String!
    $departmentId: uuid
  ) {
    insert_notes_one(
      object: {
        title: $title
        note_body: $noteBody
        department_id: $departmentId
        created_by: $createdBy
      }
    ) {
      id
      title
      note_body
      created_at
      author {
        id
        user_id
        name
      }
      department {
        id
        name
      }
    }
  }
`;

export const REMOVE_NOTE_MUTATION = gql`
  mutation removeNote($id: uuid!) {
    delete_notes_by_pk(id: $id) {
      id
    }
  }
`;
// export default {
//   ALL_DEPARTMENTS_QUERY,
//   NOTE_BY_ID_QUERY,
//   UPDATE_NOTE_MUTATION
// };
