import mongoose from 'mongoose';

// Define Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  volunteersNeeded: {
    type: Boolean,
    required: true
  },
  numberOfVolunteers: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Automatically add `createdAt` and `updatedAt` timestamps
});

// Create Event model
const Event = mongoose.model('Event', eventSchema, 'CollabNGO'); // Specify collection name as 'Events'

export default Event;
