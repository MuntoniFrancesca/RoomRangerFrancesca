import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function LeaveList() {
  const [leaveList, setLeaveList] = useState([]);
  const navigate = useNavigate();
  const [refreshId, setRefreshId] = useState(Symbol()); // This is used to render the list after approve or reject
  const { isManager } = useAuth();


  useEffect(() => {
    loadRequestList();
  }, [refreshId]);

  const jwt = localStorage.getItem('jwt');

  const authAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  const loadRequestList = async () => {
    try {
      const { data: roomAttendant } = await authAxios.get(`/roomAttendant/current`);
      const response = await authAxios.get("/leave");
      const leaveRequests = response.data.filter(leave => {
        const startDateYear = new Date(leave.startDate).getFullYear();
        const currentYear = new Date().getFullYear();
        if (!isManager) {
          return leave.roomAttendant.id === roomAttendant.id && startDateYear === currentYear;
        }
        return startDateYear === currentYear;
      })
      setLeaveList(leaveRequests);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        navigate('/login');
      } else {
        console.error('Error fetching leave requests:', error);
      }
    }

  }

  const approve = async (id) => {
    try {
      await authAxios.put(`/leave/${id}/approve`);
      alert("You have approved this leave request!")
      setRefreshId(Symbol());
      console.log(refreshId);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        navigate('/login');
      } else {
        alert(error.response.data.message);
      }
    }

  }

  const reject = async (id) => {
    try {
      await authAxios.put(`/leave/${id}/reject`);
      alert("You have rejected this leave request!")
      setRefreshId(Symbol());
    } catch (error) {
      if (error.response && error.response.status === 403) {
        navigate('/login');
      } else {
        alert(error.response.data.message);
      }
    }

  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Rejected':
        return 'red';
      default:
        return 'black';
    }
  }

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col'>
        {!isManager ? <Link className='btn btn-custom' to='/landing/leave/form'>New Leave Request</Link> : null}
        </div>
        <div className='py-2 '></div>
        <table className='table table-striped shadow'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>From</th>
              <th scope='col'>To</th>
              <th scope='col'>Days</th>
              <th scope='col'>Reason</th>
              <th scope='col'>Status</th>
              {isManager ? <th scope='col'>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {
              leaveList.map((leaveRequest, index) => (
                <tr>
                  <th scope='row' key={index}>{index + 1}</th>
                  <td>{leaveRequest.firstName + " " + leaveRequest.lastName}</td>
                  <td>{leaveRequest.startDate}</td>
                  <td>{leaveRequest.endDate}</td>
                  <td>{leaveRequest.duration}</td>
                  <td>{leaveRequest.reason}</td>
                  <td style={{ backgroundColor: getStatusColor(leaveRequest.status) }}>{leaveRequest.status}</td>
                  {isManager ? <td>
                    <button className='btn btn-outline-primary mx-2' onClick={() => approve(leaveRequest.id)}>Approve</button>
                    <button className='btn btn-outline-danger mx-2' onClick={() => reject(leaveRequest.id)}>Reject</button>
                    {/* <Link className='btn btn-outline-primary mx-2' to={`/landing/leave/edit/${leaveRequest.id}`}>Edit</Link> */}
                  </td> : null}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
