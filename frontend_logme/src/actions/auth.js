import axios from 'axios';
import Cookies from'js-cookie'
import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EDAMAM_FOOD_API,
} from './types';

export const register = (email, password, confirm_password, first_name, last_name,) => async dispatch => {
  const config = {
    headers: {
      //
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')

    }
  };
  // JSON.stringify to format a JSON response
  const body = JSON.stringify({ email, password, confirm_password, first_name, last_name });

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



