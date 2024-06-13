import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../data/user";
import './Login.css';

const Login = () => {
    const [studentNumber, setStudentNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitEvent = () => {
        let userMatching = null;
        for (let i = 0; i < user.length; i++) {
            if (user[i].username === studentNumber) {
                userMatching = i;
                if (user[userMatching].password === password) {
                    console.log("ok");
                    navigate(`/dashboard/${user[userMatching].username}`);
                    return;
                } else {
                    setError('Mot de passe incorrect');
                    return;
                }
            }
        }
        setError('Utilisateur non trouvé');
    }

    return (
        <div className="login-container">
            <h1>Connexion</h1>
            <input type="id" placeholder="Entrez votre numéro étudiant" className="login-input" onChange={(e) => setStudentNumber(e.target.value)} />
            <br />
            <input type="password" placeholder="Entrez votre mot de passe" className="login-input" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <input type="submit" value="Se connecter" className="login-submit" onClick={submitEvent} />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Login;
