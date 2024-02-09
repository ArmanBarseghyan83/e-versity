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

export const COURSE = gql`
  query course($courseId: ID!) {
    course(courseId: $courseId) {
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

export const COURSE_PAGE = gql`
query coursePage($courseId: ID!) {
  course(courseId: $courseId) {
    user {
      username
    }
    title
    price
    description
    reviews {
      user {
        username
      }
      rating
      comment
    }
    images {
      url
    }
    
  }
}
`;