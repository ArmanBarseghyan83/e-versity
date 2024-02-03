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

