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



export default createEvent;
