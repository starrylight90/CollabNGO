import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Cards } from "../components/Cards";
import "./home.css";

export const HomePage = () => {
  // Sample data for demonstration
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    time: "",
    image: "",
    description: "",
    volunteersNeeded: false,
    numberOfVolunteers: 0,
    redirectionLink: "",
  });

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const [cardData, setCardData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call your backend API to add the new event
    try {
      const response = await fetch("http://10.24.72.151:3001/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });
      if (response.ok) {
        // Handle successful response
        console.log("New event added successfully!");
        // Close the dialog
        closeDialog();
        // Refresh data
        getData();
      } else {
        // Handle error response
        console.error("Failed to add new event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getData = async () => {
    // Call your backend API to fetch event data
    try {
      const response = await fetch(
        "http://10.24.72.151:3001/api/displayevents",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCardData(data);
      } else {
        // Handle error response
        console.error("Failed to fetch event data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="card-grid">
        {cardData.map((card) => (
          <Cards
            key={card._id}
            title={card.title}
            date={card.date}
            time={card.time}
            image={card.image}
            description={card.description}
            volunteersNeeded={card.volunteersNeeded}
            numberOfVolunteers={card.numberOfVolunteers}
            organizationLink={card.redirectionLink}
          />
        ))}
      </div>
      {/* Floating button */}
      <button className="floating-button" onClick={openDialog}>
        +
      </button>
      {/* Dialog box */}
      {isDialogOpen && (
        <div className="dialog">
          <h1>Add your event</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={eventDetails.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={eventDetails.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="time"
              name="time"
              placeholder="Time"
              value={eventDetails.time}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={eventDetails.image}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={eventDetails.description}
              onChange={handleInputChange}
              required
            ></textarea>
            <div>
              <label>
                Volunteers Needed:
                <input
                  type="checkbox"
                  name="volunteersNeeded"
                  checked={eventDetails.volunteersNeeded}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      volunteersNeeded: e.target.checked,
                    })
                  }
                />
              </label>
            </div>
            {eventDetails.volunteersNeeded && (
              <input
                type="number"
                name="numberOfVolunteers"
                placeholder="Number of Volunteers"
                value={eventDetails.numberOfVolunteers}
                onChange={handleInputChange}
                required
              />
            )}
            <input
              type="url"
              name="redirectionLink"
              placeholder="Redirection Link"
              value={eventDetails.redirectionLink}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={closeDialog}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};
