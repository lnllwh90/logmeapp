import axios from 'axios';
import Cookies from'js-cookie'
import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EDAMAM_FOOD_API,
} from './types';

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      //
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
      //
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
// export const getuser = () => async dispatch =>{
//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   };
  // try {
  //   const res = axios.get(`${process.env.REACT_APP_API_URL}/user/`, config);

  //   if (res.data.success){
  //     dispatch({
  //       type: LOAD_USER_PROFILE,
  //       payload: res.data
  //     })
  //   }
  //   }
  // }

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
        type: REGISTER_SUCCESS
      });
    }
  } catch (err) {
      dispatch({
        type: REGISTER_FAIL
      });
  }
};



