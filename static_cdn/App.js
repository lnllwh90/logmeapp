import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';


const App = () => (
    <nav className="navbar row">
        <ul className="nav justify-content-end">
            <li className="nav-item">
                <a href="" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/meals">Log Meal</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="">Log Workout</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/goals">Add a New Goal</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/logout/">Logout</a>
            </li>
        </ul> 
    </nav>
    // <Router>

    // </Router>
);

export default App;