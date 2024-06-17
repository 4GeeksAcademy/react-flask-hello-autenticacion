import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupModal from "./SignupModal.jsx"; 
import LoginModal from "./LoginModal.jsx"; 


export const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false); 
    const [error, setError] = useState("");

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openLoginModal = () => { 
        setShowLoginModal(true);
    };

    const closeLoginModal = () => { 
        setShowLoginModal(false);
        setError(""); 
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", { username, password });
            localStorage.setItem("token", response.data.access_token);
            closeLoginModal();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <nav className="navbar navbar-light bg-custom">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Home</span>
                </Link>
                <div className="ml-auto">
                    <button className="btn btn-signup mx-3" onClick={openModal}>Signup</button>
                    <button className="btn btn-login" onClick={openLoginModal}>Login</button>
                </div>
            </div>
            {showModal && <SignupModal onClose={closeModal} />}
            {showLoginModal && <LoginModal onClose={closeLoginModal} />}
            {error && <p className="text-danger">{error}</p>}
        </nav>
    );
};

const styles = `
.navbar-light.bg-custom {
    background-color: #FFD580; /* Fondo naranja clarito */
}

.btn-signup {
    background-color: #28a745; /* Verde */
    border-color: #28a745;
}

.btn-signup:hover {
    background-color: #218838; /* Verde más claro */
    border-color: #1e7e34;
}

.btn-login {
    background-color: #218838; /* Verde más oscuro */
    border-color: #218838;
}

.btn-login:hover {
    background-color: #1e7e34; /* Verde más claro */
    border-color: #1c7430;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
