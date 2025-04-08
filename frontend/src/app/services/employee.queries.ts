import { gql } from 'apollo-angular';

export const GET_EMPLOYEES = gql`
  query {
    getAllEmployees {
      first_name
      last_name
      email
      gender
      department
      designation
      salary
    }
  }
`;
