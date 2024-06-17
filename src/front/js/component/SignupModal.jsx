import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const SignupModal = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const [error, setError] = useState("");

    const handleSignup = async e => {
        e.preventDefault()
        await actions.signup (username, email, password)
        await console.log("USUARIO REGISTRADO")
    }

 

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <span style={modalStyles.close} onClick={onClose}>&times;</span>
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-success">Signup</button>
                </form>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    content: {
      backgroundColor: '#f8f9fa', 
      padding: '30px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      maxWidth: '600px', 
      width: '90%', 
      position: 'relative',
    },
    close: {
      position: 'absolute',
      top: '15px', 
      right: '15px', 
      cursor: 'pointer',
      fontSize: '20px', 
      color: '#333', 
      transition: 'color 0.3s ease', 
    },
  };
  

export default SignupModal;
