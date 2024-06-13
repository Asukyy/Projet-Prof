import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../data/user";

const Login = () => {
    const [studentNumber, setStudentNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitEvent = () => {
        let userMatching = null;
        for (let i = 0; i < user.length; i++) {
            if (user[i].username === studentNumber) {
                userMatching = i;
                if (user[userMatching].password === password) {
                    console.log("ok");
                    navigate(`/dashboard/${user[userMatching].username}`);
                } else {
                    console.log("nope");
                }
            }
        }
        if (userMatching === null) {
            console.log("nope");
        }
    }

    return (
        <div>
            <input type="id" placeholder="Enter votre numéro etudiant" onChange={(e) => setStudentNumber(e.target.value)} />
            <br />
            <input type="password" placeholder="Enter votre mot de passe" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <input type="submit" value="Se connecter" onClick={submitEvent} />
        </div>
    );
}

export default Login;
