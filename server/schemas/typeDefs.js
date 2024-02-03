const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    isAdmin: Boolean
    isInstructor: Boolean
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    editAdmin(_id: ID!): User  
    editInstructor(_id: ID!): User 
  }
`;

module.exports = typeDefs;
