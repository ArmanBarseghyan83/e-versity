import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($username: String, $email: String, $password: String) {
    editUser(username: $username, email: $email, password: $password) {
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      username
    }
  }
`;

export const EDIT_INSTRUCTOR = gql`
  mutation editInstructor($id: ID!) {
    editInstructor(_id: $id) {
      isInstructor
    }
  }
`;

export const EDIT_ADMIN = gql`
  mutation editAdmin($id: ID!) {
    editAdmin(_id: $id) {
      isAdmin
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse(
    $title: String!
    $description: String!
    $price: Float!
    $images: [ImageInput]
  ) {
    addCourse(
      title: $title
      description: $description
      price: $price
      images: $images
    ) {
      title
      description
      images {
        filename
        url
      }
    }
  }
`;

export const SAVE_COURSE = gql`
  mutation saveCourse($id: ID!) {
    saveCourse(_id: $id) {
      _id
      email
      username
    }
  }
`;

export const UNSAVE_COURSE = gql`
  mutation unsaveCourse($id: ID!) {
    unsaveCourse(_id: $id) {
      username
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation placeOrder($ids: [ID]!) {
    placeOrder(ids: $ids) {
      _id
      email
      username
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(_id: $id) {
      _id
    }
  }
`;

export const EDIT_COURSE = gql`
  mutation editCourse(
    $id: ID!
    $title: String
    $images: [ImageInput]
    $description: String
    $deleteImages: [String]
  ) {
    editCourse(
      _id: $id
      title: $title
      images: $images
      description: $description
      deleteImages: $deleteImages
    ) {
      _id
      title
    }
  }
`;
export const APPROVE_COURSE = gql`
  mutation approveCourse($id: ID!) {
    approveCourse(_id: $id) {
      isApproved
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($rating: Float!, $comment: String!, $courseId: ID!) {
    createReview(rating: $rating, comment: $comment, courseId: $courseId) {
      reviews {
        rating
        comment
      }
    }
  }
`;


