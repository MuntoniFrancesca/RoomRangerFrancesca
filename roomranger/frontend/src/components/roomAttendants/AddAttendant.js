import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AttendantListComponent from "./AttendantListComponent";

export default function AddAttendant() {

  const navigate = useNavigate();

  const [attendant, setAttendant] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    notes: '',
    workingDays: []
  });
  const [attendantError, setAttendantError] = useState("");

  const { id, firstName, lastName, email, phoneNumber, username, password, notes, workingDays } = attendant;

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Update state for multi-checkbox inputs
      setAttendant(prevFormData => ({
        ...prevFormData,
        workingDays: checked
          ? [...prevFormData.workingDays, value]
          : prevFormData.workingDays.filter(day => day !== value),
      }));
    } else {
      // Update state for other input types
      setAttendant({
        ...attendant,
        [name]: type === 'radio' ? value : e.target.value,
      });
    }
  };

  const jwt = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAxios.post('/roomAttendant/add', attendant);
      navigate("/landing/attendants")
    }
    catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 error - Unauthorized, navigate to login page
        navigate('/login');
      } else {
        setAttendantError(error.response.data.roomAttendant);
      }

    }
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md- border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">New Attendant</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="verifyPassword" className="form-label">
                Verify Password
              </label>
              <input
                type="password"
                className="form-control"
                name="verifyPassword"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="row">
            <div className="md-3">
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
              <textarea
                className="form-control"
                id="notes"
                name="notes"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="workingDays" className="form-label">
                Working Days
              </label>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div className="col-md-3" key={day}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={day}
                        name="workingDays"
                        value={day}
                        checked={attendant.workingDays.includes(day)}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={day}>
                        {day}
                      </label>
                      
                    </div>
                  </div>
                ))}
              </div>
         
            <button type="submit" className="btn btn-action mx-2">
              Submit
            </button>
            <Link className="btn btn-danger mx-2" to="/landing/attendants">
              Cancel
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}