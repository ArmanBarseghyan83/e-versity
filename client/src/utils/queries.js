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
export const APPROVED_COURSES = gql`
  query approvedCourses {
    approvedCourses {
      _id
      title
      description
      price
      reviews {
        rating
      }
      images {
        url
      }
    }
  }
`;
export const MY_COURSES = gql`
  query myCourses {
    myCourses {
      _id
      title
      price
      isApproved
      images {
        filename
        url
      }
    }
  }
`;
export const ALL_COURSES = gql`
  query allCourses {
    allCourses {
      _id
      title
      isApproved
      images {
        filename
        url
      }
      user {
        username
      }
    }
  }
`;
export const COURSE = gql`
  query course($courseId: ID!) {
    course(courseId: $courseId) {
      _id
      title
      description
      price
      reviews {
        user {
          username
        }
        comment
        rating
      }
      images {
        filename
        url
      }
    }
  }
`;