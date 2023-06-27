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
  user: '',
};

export default function(state = initialState, action){
  // destruct your action
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      // in this example, if you are signed in then you should not be able to register
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      }
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false
      }
    case LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload.profile_name,
        isAuthenticated: true
      }
    case LOGOUT_SUCCESS:
      return{
        ...state,
        isAuthenticated: false,
      }
      case LOAD_USER_PROFILE_FAIL:
        return{
          ...state,
        isAuthenticated: false,
        }
    case REGISTER_FAIL:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
      return state
    default:
      return state;

  };
};