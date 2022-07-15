import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './hocs/Layout';

import Login from './containers/Login'
import Signup from './containers/Signup'
import Meallog from './containers/Meallog'
import Welcome from './containers/Welcome'
import Workout from './containers/Workout'
import Logout from './containers/Logout'
import Goal from './containers/Goal'

const App = () => {
    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/logme/' element = {<Layout />}/>
                <Route path='/logme/logme-login' element={<Login />}/>
                <Route path='/logme/logme-signup' element={<Signup />}/>
                <Route path='/logme/logme-meals' element={<Meallog />} />
                <Route path='/logme/logme-welcome' element={<Welcome />} />
                <Route path='/logme/logme-workouts' element={<Workout /> } />
                <Route path='/logme/logme-goals' element={<Goal />} />
                <Route path='/logme/logme-logout' element={<Logout />} />
            </Routes>
        </BrowserRouter>    
    </div>
);
}


export default App;