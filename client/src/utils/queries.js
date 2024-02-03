import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      username
      isInstructor
      isAdmin
      myLearnig {
        _id
        title
        images {
          filename
          url
        }
      }
      savedCourses {
        _id
        title
        images {
          filename
          url
        }
      }
    }
  }
`;

export const ALL_USERS = gql`
  query users {
    users {
      _id
      username
      isAdmin
      isInstructor
    }
  }
`;
