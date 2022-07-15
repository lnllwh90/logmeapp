import React from 'react';
import CSRFToken from '../components/CSRFToken';
import { Link } from'react-router-dom'
import Nav from '../components/Navbar'

const login = () => {
    
    return(
    <div className="container-fluid" id="wrapper">
    <Nav />
    <div className="login_registration_card">
        <div className="box">
            <p id="title">Login</p>
            <form action="login/" method="POST" className=" h5 form">
                <CSRFToken />
                <p> 
                    <input type="email" name="email" maxlength="254" id="email_logo" placeholder="Email Address" className="field" required=""></input>
                </p>
                <p> 
                    <input type="text" name="pw" maxlength="255" id="pw_logo" placeholder="Password" className="field" required=""></input>
                </p>
                <button type="submit" className="button">Login</button>
            </form>
            <p className='logReg-footer'>
                Need to register? <Link to="/logme/logme-signup">Sign-up here!</Link>
            </p>
        </div>
    </div>
    </div>

);
}

export default login;