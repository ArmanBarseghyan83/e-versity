const mongoose = require('mongoose');
const imageSchema = require('./Image');
const reviewSchema = require('./Review');

const courseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
