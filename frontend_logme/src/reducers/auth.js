import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types'

const initialState = {
  isAuthenticated: null
};

export default function(state = initialState, action){
  // destruct your action
  const { type } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      // in this example, if you are signed in then you should not be able to regester
      return {
        ...state,
        isAuthenticated: false
      }
    case REGISTER_FAIL:
        return state
    default:
        return state
  };
};