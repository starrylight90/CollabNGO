import Event from "../models/eventModel.js";

const createEvent = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      image,
      description,
      volunteersNeeded,
      numberOfVolunteers,
    } = req.body;

    // Create a new Event instance
    const newEvent = new Event({
      title,
      date,
      time,
      image,
      description,
      volunteersNeeded,
      numberOfVolunteers,
    });

    // Save the new event to the database
    const savedEvent = await newEvent.save();

    // Return the created event with a status code of 201 (Created)
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    // Return an error response with a status code of 500 (Internal Server Error)
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Controller function to display all events
const displayEvents = async (req, res) => {
  try {
    // Retrieve all events from the database
    const events = await Event.find();

    // Send the events as a JSON response with a status code of 200 (OK)
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return an error response with a status code of 500 (Internal Server Error)
    res.status(500).json({ message: 'Failed to fetch events', error: error.message });
  }
};

export { createEvent, displayEvents };
