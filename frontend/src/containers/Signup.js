import React, { useState } from 'react';
import { register } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from'react-router-dom'
import Nav from '../components/Navbar'

// Redirect is now Navigate in the module
import { Navigate } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';

const Signup = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        profile_name: ''

    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { email, password, confirm_password, first_name, last_name, profile_name } = formData

    // Allow the state to update with the User input
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();

        if (password === confirm_password) {
            register(email, password, confirm_password, first_name, last_name, profile_name);
            setAccountCreated(true);
        }
    };
    // figure this out, should go to home page from the isAuthenticated condition not accountCreated
    if (isAuthenticated)
        return <Navigate to= '/logme/logme-welcome' />;
    else if (accountCreated)
        return <Navigate to='/logme/logme-login' />;
    
    // else if (accountCreated)
    //     return <Redirect to='/login' />;

    return(
    <div className="container-fluid" id="wrapper">
        <Nav />
        <div className="login_registration_card" id="registration_card2">
        <div className="box">
        <p id="title">Registration </p>
        <form className="h5 form" onSubmit={e => onSubmit(e)}>
            <CSRFToken />
            <p className='formFormat'> 
                <label>Profile Name: </label>
                <input 
                    type="text" 
                    name="profile_name" 
                    placeholder="Username" 
                    className="field" 
                    onChange={e => onChange(e)}
                    value={profile_name}
                />
            </p>
            <p className='formFormat'> 
                <label>First Name: </label>
                <input 
                    type="text" 
                    name="first_name" 
                    placeholder="First Name" 
                    className="field" 
                    minLength="2"
                    value={first_name}
                    onChange={e => onChange(e)}
                    required 
                />
            </p>
            <p className='formFormat'> 
                <label>Last Name: </label>
                <input 
                    type="text" 
                    name="last_name" 
                    placeholder="Last Name" 
                    className="field" 
                    minLength="2" 
                    value={last_name}
                    onChange={e => onChange(e)}
                    required
                />
            </p>
            <p className='formFormat'> 
                <label>Email: </label>
                <input 
                    type="email" 
                    name="email" 
                    id="email_logo" 
                    placeholder="Email Address" 
                    className="field" 
                    value={email}
                    required 
                    onChange={e => onChange(e)}
                />
            </p>
            <p className='formFormat'> 
                <label>Password: </label>
                <input 
                    type="password" 
                    name="password" 
                    minLength="8" 
                    id="pw_logo" 
                    placeholder="Password" 
                    className="field"
                    value={password} 
                    required 
                    onChange={e => onChange(e)}
                />
            </p>
            <p className='formFormat'> 
                <label>Confirm Password: </label>
                <input 
                    type="password" 
                    name="confirm_password" 
                    maxLength="64" 
                    placeholder="Confirm Password" 
                    className="field" 
                    id="id_cpw" 
                    value={confirm_password}
                    onChange={e => onChange(e)}
                    required 
                />
            </p>
            <button type="submit" className="button">Register</button>
        </form>
        <p className='logReg-footer'>
            Already have an account? <Link to="/logme/logme-login">Back to Login</Link>
        </p>
        </div>
        </div>
    </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Signup);

//action="create_user/" method="POST" className="h5 form"

// <p> 
// <input type="text" name="first_name" maxlength="45" placeholder="First name" className="field" required id="id_first_name" onChange={e => onChange(e)}/>
// </p>
// <p> 
// <input type="text" name="last_name" maxlength="45" placeholder="Last name" className="field" required="" id="id_last_name" onChange={e => onChange(e)}/>
// </p>