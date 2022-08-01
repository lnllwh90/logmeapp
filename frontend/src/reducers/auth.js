import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../actions/types'

const initialState = {
  isAuthenticated: null,
  email: '',
  first_name: '',
  last_name: '',
  profile_name: ''
};

export default function(state = initialState, action){
  // destruct your action
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      // in this example, if you are signed in then you should not be able to register
      return {
        ...state,
        isAuthenticated: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        email: payload
      }
    case LOGOUT_SUCCESS:
      return{
        ...state,
        isAuthenticated: false,
        email: ''
      }
    case REGISTER_FAIL:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
      return state
    default:
      return state

  };
};