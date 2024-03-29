import React, { Fragment } from 'react';
import {NavLink, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Nav = ({  isAuthenticated, logout }) => {

    const authLinks = (
        <Fragment>
            <li className="nav-item">
                    <NavLink exact to="/logme/logme-welcome" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/logme/logme-meals">Log Meal</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/logme/logme-workouts">Log Workout</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/logme/logme-goals">Add a New Goal</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/logme/logme-logout/" onClick={logout} href='#!' >Logout</NavLink>
                </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to = '/logme/logme-About'>About</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to = '/logme/logme-Login'>Login</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to = '/logme/logme-signup'>Register</NavLink>
            </li>
        </Fragment>
    );

    return (
    <div className='container-fluid' id="wrapper">
        <nav className="navbar row">
            <ul className="nav justify-content-end">
                { ~isAuthenticated ? guestLinks : authLinks }
            </ul>
        </nav>

        <Outlet />
    </div>
);}

const mapStateToProps = state => ({
    isAuthnticated: state.auth.isAuthnticated
})

export default connect(mapStateToProps, { logout })(Nav);