import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import '../App.css'

export default function NavBar() {
    const authContext = useAuth();
    const { isAuthenticated, isManager } = authContext;

    function logout() {
        authContext.logout()
    }
    return (
        <div>
            <nav className="navbar">
                <ul className="links">
                    <div className="navbar-brand"><h2>Room<br />Ranger</h2></div>
                        {isManager ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/landing">Home Page</Link >
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/landing/rooms">Rooms</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/landing/attendants">Room Attendants</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/landing/leave">Leave Request</Link>
                                </li>
                            </>
                        ) : (
                            <>

                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/landing/roomattendant">Home Page</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/landing/leave">Leave Request</Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            {isAuthenticated && <Link className='nav-link' to='/' onClick={logout}>Log Out</Link>}
                        </li>
                    </ul>
            </nav>
            <Outlet />
        </div>
    );
}
