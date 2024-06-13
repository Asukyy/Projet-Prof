import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import users from '../data/user';
import notesData from '../data/notes';
import './Dashboard.css';

const Dashboard = () => {
  const { username } = useParams();
  const currentUser = users.find(user => user.username === username);
  const navigate = useNavigate();
  const [notes, setNotes] = useState(notesData);

  if (!currentUser) {
    return <p>User not found</p>;
  }

  const handleNoteChange = (username, subject, value) => {
    const updatedNotes = [...notes];
    const userIndex = updatedNotes.findIndex(user => user.username === username);
    updatedNotes[userIndex].notes[subject] = value;
    setNotes(updatedNotes);
  };

  const handleSaveNotes = (username) => {
    const updatedNotes = notes.find(user => user.username === username);
    notesData.forEach(user => {
      if (user.username === username) {
        user.notes = { ...updatedNotes.notes };
      }
    });
    alert("Notes mises à jour avec succès !");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {currentUser.role === 'STUDENT' ? (
        renderStudentView(currentUser, notes.find(n => n.username === currentUser.username))
      ) : currentUser.role === 'ADMIN' ? (
        renderAdminView(users.filter(user => user.role === 'STUDENT'), notes, handleNoteChange, handleSaveNotes, navigate)
      ) : (
        <p>Unauthorized access</p>
      )}
    </div>
  );
};

const renderStudentView = (currentUser, noteEleve) => (
  <div>
    <p>Bienvenue, {currentUser.name}!</p>
    <h2>Votre Planning</h2>
    <h2>Vos Absences: {currentUser.absence}</h2>
    <h2>Vos Notes</h2>

    {noteEleve ? (
      <div>
        <p>Math: {noteEleve.notes.math}</p>
        <p>Science: {noteEleve.notes.science}</p>
        <p>Literature: {noteEleve.notes.literature}</p>
      </div>
    ) : (
      <p>Grades not found</p>
    )}
  </div>
);

const renderAdminView = (students, notes, handleNoteChange, handleSaveNotes, navigate) => (
  <>
    <p>Bienvenue, Admin!</p>
    <h2>Liste des Élèves</h2>
    <div className="student-cards">
      {students.map(student => (
        <div key={student.username} className="student-card">
          <img src={student.image} alt={student.name} />
          <h3>{student.name}</h3>
          <p>Username: {student.username}</p>
          <div>
            <label>
              Math:
              <input
                type="number"
                value={notes.find(n => n.username === student.username)?.notes.math || ''}
                onChange={(e) => handleNoteChange(student.username, 'math', parseInt(e.target.value))}
              />
            </label>
            <br />
            <label>
              Science:
              <input
                type="number"
                value={notes.find(n => n.username === student.username)?.notes.science || ''}
                onChange={(e) => handleNoteChange(student.username, 'science', parseInt(e.target.value))}
              />
            </label>
            <br />
            <label>
              Literature:
              <input
                type="number"
                value={notes.find(n => n.username === student.username)?.notes.literature || ''}
                onChange={(e) => handleNoteChange(student.username, 'literature', parseInt(e.target.value))}
              />
            </label>
            <br />
            <button onClick={() => handleSaveNotes(student.username)}>Enregistrer</button>
          </div>
        </div>
      ))}
    </div>
    <button onClick={() => navigate(`/dashboard/${users.find(user => user.role === 'ADMIN').username}/cours`)}>
      Voir Planning des Cours
    </button>
  </>
);

export default Dashboard;
