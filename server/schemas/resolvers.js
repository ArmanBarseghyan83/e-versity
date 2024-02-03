const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async () => {
      return await User.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    editUser: async (parent, { username, email, password }, context) => {
      const user = await User.findById(context.user._id);

      user.username = username || user.name;
      user.email = email || user.email;

      if (password) {
        user.password = password;
      }
      return await user.save();
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    deleteUser: async (parent, { _id }) => {
      const user = await User.findByIdAndDelete(_id);

      return user;
    },

    editAdmin: async (parent, { _id }) => {
      const user = await User.findById(_id);

      if (user.isAdmin) {
        user.isAdmin = false;
        await user.save();
      } else {
        user.isAdmin = true;
        await user.save();
      }

      return user;
    },

    editInstructor: async (parent, { _id }) => {
      const user = await User.findById(_id);

      if (user.isInstructor) {
        user.isInstructor = false;
        await user.save();
      } else {
        user.isInstructor = true;
        await user.save();
      }

      return user;
    },
  },
};

module.exports = resolvers;
