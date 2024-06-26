import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LeaveForm({ firstname = "Luna", lastname = "Liu" }) {

    let navigate = useNavigate();
    const [leaveRequest, setLeaveRequest] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [roomAttendant, setRoomAttendant] = useState({});
    
    const calculateDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        // console.log("diffTime" + diffTime);
        // console.log("diffDays" + diffDays);
        // setLeaveRequest({ ...leaveRequest, duration: diffDays })
        return diffDays;
    }
    const calculateRemaingDays = () => {
        // const{remainingDays, duration} = leaveRequest;
        // setLeaveRequest({...leaveRequest,remainingDays: remainingDays - duration});
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        console.log("^^^^", name, value, typeof value);
        setLeaveRequest({ ...leaveRequest, [name]: value });
    }
    const jwt = localStorage.getItem('jwt');

    const authAxios = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    const loadRoomAttendant = async () => {
        try {
            const response = await authAxios.get(`/roomAttendant/current`)
            setRoomAttendant(response.data);
        } catch (error) {
            // console.log(error.response.data.message)
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await authAxios.post("/leave/add", {
                ...leaveRequest,
                firstName: roomAttendant.firstName,
                lastName: roomAttendant.lastName,
                roomAttendant: roomAttendant.id
            });
            navigate("/landing/leave");
            // console.log(leaveRequest);
        } catch (error) {
            // console.log(error.response.data);
            if (error.response && error.response.status === 403) {
                // 403 error - Unauthorized, navigate to login page
                navigate('/login');
            } else {
                // Handle other errors
                alert(error.response.data.message);
            }

        }
    }

    useEffect(() => {
        loadRoomAttendant();
    }, []);

    return (
        <div className="container mt-5 m-lg-auto p-5 shadow">
            <section className="leave-request">
                <header className="text-center mb-5">
                    {/* <i className="bi bi-person-fill display-1 text-primary"></i> */}
                    <h2 className="display-5">Leave Request Form</h2>
                </header>
                <form id="LeaveRequestForm" onSubmit={onFormSubmit}>
                    <div className="row mb-3">
                        <label className="form-label">Name</label>
                        <div className="col">
                            <label className="form-control">{roomAttendant.firstName}</label>
                        </div>
                        <div className="col">
                            <label className="form-control">{roomAttendant.lastName}</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Room Attendant ID</label>
                            <label className="form-control">{roomAttendant.id}</label>
                        </div>
                        <div className="col">
                            <label className="form-label">Remaining leave days</label>
                            <label className="form-control">{roomAttendant.remainingDays - calculateDuration(leaveRequest.startDate, leaveRequest.endDate)}</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Start date<small className="text-muted">
                                (incl. 1st day)</small>
                            </label>
                            <input type="date"
                                className="form-control"
                                name="startDate"
                                value={leaveRequest.startDate}
                                onChange={onInputChange} required />
                        </div>
                        <div className="col">
                            <label className="form-label">End date<small className="text-muted">
                                (incl. last day)</small>
                            </label>
                            <input type="date"
                                className="form-control"
                                name="endDate"
                                value={leaveRequest.endDate}
                                onChange={onInputChange} required />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div>
                            <label className="form-label">Leave Reason</label>
                            <textarea
                                // type="textarea"
                                className="form-control"
                                name="reason"
                                value={leaveRequest.reason}
                                onChange={onInputChange} required />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to='/landing/leave'>Cancel</Link >
                </form>
            </section>
        </div>
    )
}