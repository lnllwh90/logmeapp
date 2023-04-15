import axios from 'axios';
import Cookies from 'js-cookie'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EDAMAM_FOOD_API,
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS } from './types';

export const checkAuthenticated = () => async dispatch => {
  const config = {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/authenicated/`, config)

    if (res.data.error || res.data.isAuthenticated === 'error') {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false
      });
    }
    else if (res.data.isAuthenticated === 'success') {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true
      });
    }
    else{
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false
      })
    }
  } catch(err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false
      });
    }
};

export const load_user = () => async dispatch => {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, config);

    if (res.data.error) {
      dispatch({
        type: LOAD_USER_PROFILE_FAIL
      });
    } else {
        dispatch({
          type: LOAD_USER_PROFILE_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_USER_PROFILE_FAIL
      });
    }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };
  const body =  JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login/`, body, config);

    if (res.data.success){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.email
      });
      dispatch(load_user());
      console.log(res.data.success)
    } else {
      dispatch({
        type: LOGIN_FAIL
      });
    }
  } catch (err) {
      dispatch({
        type: LOGIN_FAIL
      });
  }
}

export const logout = (email, password) => async dispatch => {
  const config = {

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/logout/`, config);

    if (res.data.success){

      dispatch({
        type: LOGOUT_SUCCESS,
      });

      console.log(res.data.success)
    } else {
      dispatch({
        type: LOGOUT_FAIL
      });
    }
  } catch (err) {
      dispatch({
        type: LOGOUT_FAIL
      });
  }
}

export const register = (email, password, confirm_password, first_name, last_name, profile_name) => async dispatch => {
  const config = {
    headers: {
      //
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  };
  // JSON.stringify to format a JSON response
  const body = JSON.stringify({ email, password, confirm_password, first_name, last_name, profile_name });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/register/create_user/`, body, config);

    if (res.data.error){

      dispatch({
        type: REGISTER_FAIL
      });

      console.log(res.data.error)
    } else {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.email
      });
      dispatch(load_user());
      console.log(res.data.success)
    }
  } catch (err) {
      dispatch({
        type: REGISTER_FAIL
      });
  }
};



