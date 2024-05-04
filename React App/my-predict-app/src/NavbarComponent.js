//NavbarComponent.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from './AuthContext.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">PlantGuard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ai-engine">AI-Engine</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">About Us</Link>
              </li>
          </ul>
          <ul className="navbar-nav">
            {currentUser ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {currentUser.username || currentUser.email}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/ProfilePage">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/PredictionHistory">Prediction History</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/LoginPage">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/RegPage">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
