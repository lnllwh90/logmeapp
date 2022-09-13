import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_FAIL,
} from '../actions/types'

const initialState = {
  isAuthenticated: null,
  email: '',
  first_name: '',
  last_name: '',
  profile_name: '',
  id: null
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
        isAuthenticated: true
      }
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: payload
      }
    case LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile_name: payload.profile.profile_name,
        email: payload.profile.email,
        id: payload.profile.id,
      }
    case LOGOUT_SUCCESS:
      return{
        ...state,
        isAuthenticated: false,
        email: ''
      }
      case LOAD_USER_PROFILE_FAIL:
        return{
          ...state,
          profile_name: '',
          email: '',
          first_name: '',
          last_name: '',
          id: null
        }
    case REGISTER_FAIL:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
      return state
    default:
      return state

  };
};