const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    savedCourses: [Course]
    myLearnig: [Course]
    isInstructor: Boolean
    isAdmin: Boolean
  }
  
  type Auth {
    token: ID!
    user: User
  }

  input ImageInput {
    url: String
    filename: String
  }

  input ReviewInput {
    user: ID
    rating: Float
    comment: String
  }
  
  type Image {
    url: String
    filename: String
  }

  type Review {
    user: ID
    rating: Float
    comment: String
  }

  type Course {
    _id: ID
    user: User
    title: String
    images: [Image]
    description: String
    reviews: [Review]
    price: Float
    isApproved: Boolean
    createdAt: String
    updatedAt: String
  }

  type Query {
    me: User
    users: [User]
    course(courseId: ID!): Course
    approvedCourses: [Course]
    myCourses: [Course]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, email: String, password: String): User
    addCourse(
      title: String!
      images: [ImageInput]
      description: String!
      reviews: [ReviewInput]
      price: Float!
    ): Course
    saveCourse(_id: ID!): User
    unsaveCourse(_id: ID!): User
    placeOrder(ids: [ID]!): User
    deleteCourse(_id: ID!): Course
    editCourse(
      _id: ID!
      title: String
      images: [ImageInput]
      deleteImages: [String]
      description: String
      reviews: [ReviewInput]
      price: Float): Course
  }
`;

module.exports = typeDefs;