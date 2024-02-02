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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
