import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditRoom() {
    let navigate = useNavigate();
    const { id } = useParams()
    const [types, setTypes] = useState([]);
    const [room, setRoom] = useState({
        roomNumber: "",
        roomType: "",
        available: true
    });

    useEffect(() => {
        fetchTypes();
        loadRoom();
    }, [])
    const jwt = localStorage.getItem('jwt');

    const authAxios = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    // room input handler
    const onInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // const name = e.target.name;
        console.log(e.target);
        const updatedValue = type === 'checkbox' ? checked : value;
        setRoom({ ...room, [name]: updatedValue });
    }
    // get the types
    const fetchTypes = async () => {
        const typesResponse = await authAxios.get('/rooms/types');
        const typesArray = Object.entries(typesResponse.data);
        setTypes(typesArray);
    };

    //fetch room
    const loadRoom = async () => {
        const result = await authAxios.get(`/rooms/room/${id}`)
        setRoom(result.data);
    }

    //form submit event handler
    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await authAxios.put(`/rooms/room/${id}`, room);
            navigate("/landing/rooms");  //navigate to the rooms home page
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // 403 error - Unauthorized, navigate to login page
                navigate('/login');
            } else {
                alert(error.response.data.message);
            }
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Room</h2>
                    <form onSubmit={onFormSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='RoomNumber' className='form-label'>
                                Room Number : {room.roomNumber}
                            </label>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='RoomType' className='form-label'>
                                Room Type
                            </label>
                            <select name='roomType' value={room.roomType} onChange={onInputChange}>
                                <option value="" disabled>Select a type</option>
                                {/* destructuring assignment  */}
                                {types.map(([name, displayName]) => (
                                    <option key={name} value={name}>{displayName}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label hemlFor='Available' >
                                Is Available
                                <input
                                    type="checkbox"
                                    name='available'
                                    checked={room.available}
                                    onChange={onInputChange}
                                />
                            </label>
                        </div>
                        <button type='submit' className='btn btn-success mx-2'>Submit</button>
                        <Link className='btn btn-danger mx-2' to='/landing/rooms'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
