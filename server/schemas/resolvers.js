const { User, Course } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('savedCourses')
          .populate('myLearnig');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    users: async () => {
      return await User.find({});
    },

    course: async (parent, { courseId }) => {
      return await Course.findById(courseId).populate('user');
    },

    approvedCourses: async () => {
      return await Course.find({ isApproved: true }).populate('user');
    },

    myCourses: async (parent, ags, context) => {
      return await Course.find({ user: context.user._id }).populate('user');
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

      const course = await Course.findOneAndDelete({ user: user._id });
      course?.images.forEach(async (image) => {
        await cloudinary.uploader.destroy(image.filename);
      });

      return user;
    },

    addCourse: async (parent, args, context) => {
      return await Course.create({ ...args, user: context.user._id });
    },

    saveCourse: async (parent, args, context) => {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedCourses: args._id } },
        { new: true }
      );
    },

    unsaveCourse: async (parent, args, context) => {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedCourses: args._id } }
      );
    },

    placeOrder: async (parent, { ids }, context) => {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { myLearnig: ids } },
        { new: true }
      );
    },

    deleteCourse: async (parent, args, context) => {
      const course = await Course.findByIdAndDelete({ _id: args._id });

      return course;
    },

    editCourse: async (parent, args, context) => {
      const updatedCourse = await Course.findOneAndUpdate(
        { _id: args._id },
        {
          $set: {
            title: args.title,
            description: args.description,
            price: args.price,
          },
          $addToSet: { images: args.images },
        },
        { new: true }
      );

      return updatedCourse;
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
