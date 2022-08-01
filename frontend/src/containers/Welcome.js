import React from 'react';
import Nav from '../components/Navbar';

const welcome = () => {
    
    return (

    <div className="container-fluid" id="wrapper">
        <Nav />
        <div className="card m-3">
            <div className="card-body">
                <p className="h2 card-title" id='cap'> Welcome User !</p>
                <p className="card-text" id='cap'> You are x calories away from reaching your weekly goal!</p>
            </div>
        </div>
        <div id="welcome_pane">
        <p id="descriptions">words</p>
        </div>
        <div className="card-group">
            <div className='card box-home'>
                <div className="card-body" id="meal_cal">
                    <p className="h5 card-title welcome_text"><a href="/meals">View Meal Calendar</a></p>
                    <p className="card-text welcome_text" >Don't lose track! Check out your Meal Calendar.</p>
                    <p className="card-text">
                        <small className="text-muted">Last updated (Model Name)</small>
                    </p>
                </div>
            </div>
            <div className='card box-home'>
                <div className="card-body" id="wo_cal">
                    <p className="h5 card-title welcome_text"><a href="/workouts">View Workout Calendar</a></p>
                    <p className="card-text welcome_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing. Felis eget velit aliquet sagittis id consectetur purus ut faucibus.</p>
                    <p className="card-text"><small className="text-muted">Last updated (Model Name)</small></p>
                </div>
            </div>
            <div className='card box-home'>
                <div className="card-body" id="goals">
                    <a href="/goals"><p className="h5 card-title welcome_text">View Goals</p></a>
                    <p className="card-text welcome_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing. Felis eget velit aliquet sagittis id consectetur purus ut faucibus.</p>
                    <p className="card-text"><small className="text-muted">Last updated (Model Name)</small></p>
                </div>
            </div>
        </div>
    </div>
);}

export default welcome;