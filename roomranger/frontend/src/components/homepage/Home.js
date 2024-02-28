import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homepage.css';
import '../../App.css'

const HomePage = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    console.log('Selected Role:', role);
    setSelectedRole(role);
  };

  return (
    <div className="container">
      <h1>Welcome to ROOM RANGER!</h1>
      <div className="row">
        <Dropdown>
          <Dropdown.Toggle variant="Black" id="dropdown-basic">
            I am: {selectedRole}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {(selectedRole !== 'Manager') && (
              <Dropdown.Item onClick={() => handleRoleSelect('Manager')}>
                Manager
              </Dropdown.Item>
            )}
            {(selectedRole !== 'RoomAttendant') && (
              <Dropdown.Item onClick={() => handleRoleSelect('Room Attendant')}>
                Room Attendant
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {selectedRole === 'Manager' && (
        <div className="container">
          <Link to="/login" className="btn btn-custom">Login</Link>
          <Link to="/register" className="btn btn-custom">Register</Link>
        </div>
      )}

      {selectedRole === 'Room Attendant' && (
        <div>
          <Link to="/login" className="btn btn-custom">Login</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
