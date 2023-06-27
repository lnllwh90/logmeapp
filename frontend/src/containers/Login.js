import React, { useState } from 'react';
import CSRFToken from '../components/CSRFToken';
import { Link } from'react-router-dom'
import Nav from '../components/Navbar'
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Navigate } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    }

    if (isAuthenticated)
        return <Navigate to= '/logme/logme-welcome' />;
    
    return(
    <div className="container-fluid" id="wrapper">
        <Nav />
        <div className="login_registration_card">
        <div className="box">
        <p id="title">Login</p>
        <form className="h5 form" onSubmit={e => onSubmit(e)}>
            <CSRFToken />
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

            <button type="submit" className="button">Login</button>
        </form>
        <p className='logReg-footer'>
            Need to register? 
            <Link to="/logme/logme-signup">
                Sign-up here!
            </Link>
        </p>
        </div>
        </div>
    </div>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.email
});

export default connect(mapStateToProps, { login })(Login);