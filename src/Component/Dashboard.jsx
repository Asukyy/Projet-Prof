import React from 'react';
import { useParams } from 'react-router-dom';
import users from '../data/user';
import notes from '../data/notes';
import cours from '../data/cours';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const { username } = useParams();
  const currentUser = users.find(user => user.username === username);
  const noteEleve = notes.find(notes => notes.username === username);
  const navigate = useNavigate();


  if (!currentUser) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {currentUser.role === 'STUDENT' ? (
        renderStudentView(currentUser, noteEleve)
      ) : currentUser.role === 'ADMIN' ? (
        renderAdminView(currentUser)
      ) : (
        <p>Unauthorized access</p>
      )}
    </div>
  );
};

const renderStudentView = (currentUser, noteEleve) => (
  <div>
    <p>Bienvenue, {currentUser.name}!</p>
    {currentUser.absence}
    <h2>Votre Planning</h2>
    <h2>Vos Absences</h2>
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

const renderAdminView = (currentUser) => (
  <>
    <p>Bienvenue, {currentUser.name} (Admin)!</p>
    <h2>Vue Admin</h2>
    <p>a ton tour Luca</p>
  </>
);

export default Dashboard;
