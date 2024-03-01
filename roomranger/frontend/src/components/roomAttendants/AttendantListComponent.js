import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';


export default function AttendantListComponent() {

  const [attendants, setAttendants] = useState([]);
  const [days, setDays] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    loadAttendants();
  },
    []
  );
  const jwt = localStorage.getItem('jwt');

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });


  const loadAttendants = async () => {
    try {
      const attendantsResponse = await authAxios.get("/roomAttendant");
      setAttendants(attendantsResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        navigate('/login');
      } else {
        console.error("Error loading attendants:", error);
      }
    }
  };

  const deleteAttendant = async (id) => {
    try {
      await authAxios.get(`/roomAttendant/delete/${id}`);
      loadAttendants();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        navigate('/login');
      } else {
        console.error("Error deleting attendant:", error);
      }
    }
  };

  return (
    <div className='container'>
        <div className='row mt-3'>
            <div className='col'>
        <Link className='btn btn-custom' to='/landing/attendants/add'>Add Attendant</Link>
          </div>
        <form>
          <div className='py-2 '></div>
          <table className='table border table-bordered shadow'>
            <thead>
              <tr>
                <th scope='col' className='text-center'>#</th>
                <th scope='col' className='text-center'> ID </th>
                <th scope='col' className='col-md-2 text-center'>Name</th>
                <th scope='col' className='col-md-4 text-center'>E-mail</th>
                <th scope='col' className='col-md-2 text-center'>Schedule</th>
                <th scope='col' className=' col-md-3 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                attendants.map((roomAttendant, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{roomAttendant.id}</td>
                    <td>{roomAttendant.firstName}{' '}{roomAttendant.lastName}</td>
                    <td>{roomAttendant.email}</td>
                    <td>
                      {roomAttendant.workingDays && roomAttendant.workingDays.length > 0
                        ? roomAttendant.workingDays.join(', ')
                        : ''}
                    </td>
                    <td align='center'><Link className='btn btn-action mx-2' to={`/landing/attendants/profile/${roomAttendant.id}`}>View</Link>
                      <Link className='btn btn-action mx-2' to={`/landing/attendants/update/${roomAttendant.id}`} >Edit</Link>
                      <button className='btn btn-danger mx-2' onClick={() => deleteAttendant(roomAttendant.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
      </div>

    </div>
  );
}
