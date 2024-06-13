import React from 'react';
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import { useNavigate, useParams } from 'react-router-dom';
import cours from '../data/cours';
import './Cours.css';

const Cours = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const { username } = useParams();

  const events = cours.map(course => ({
    id: DayPilot.guid(),
    text: course.cours,
    start: `${currentDate}T${course.start.split('T')[1]}`,
    end: `${currentDate}T${course.end.split('T')[1]}`,
    resource: course.salle
  }));

  return (
    <div className="cours-container">
      <h1>Planning des Cours</h1>
      <button onClick={() => navigate(`/dashboard/${username}`)}>Retour</button>
      <DayPilotScheduler
        startDate={currentDate}
        days={1}
        scale={"Hour"}
        timeHeaders={[{ groupBy: "Day" }, { groupBy: "Hour" }]}
        events={events}
        eventHeight={50}
        cellWidth={80}
        resources={[
          { name: "Salle A", id: "Salle A" },
          { name: "Salle B", id: "Salle B" },
          { name: "Salle C", id: "Salle C" }
        ]}
        groupBy="resource"
        treeEnabled={true}
        onEventClick={args => console.log("Event clicked: ", args)}
      />
    </div>
  );
};

export default Cours;
