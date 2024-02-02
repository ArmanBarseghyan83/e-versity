import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      username
      isInstructor
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
