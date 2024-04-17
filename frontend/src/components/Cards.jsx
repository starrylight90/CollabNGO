import React from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
export const Cards = ({ title, date, time, image, description, volunteersNeeded, numberOfVolunteers ,organizationLink}) => {
  return (
    
    <div className="card">
      <img
        src={image}
        className="card-img-top"
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Date: {formatDate(date)}</p>
        <p className="card-text">Time: {time}</p>
        {volunteersNeeded && (
          <p className="card-text">Volunteers Needed: {numberOfVolunteers}</p>
        )}
        <a href={organizationLink} target="_blank" className="btn btn-primary" data-mdb-ripple-init>
          Go to Event
        </a>
      </div>
    </div>
  );
};
