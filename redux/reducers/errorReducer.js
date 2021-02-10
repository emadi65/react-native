const INITIAL_STATE = {
  loginError: "",
  firebase_error: "",
  signup_error: "",
};

export function errorReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN_ERROR": {
      return {
        ...state,
        loginError: action.payload,
      };
    }
    case "SIGNUP_ERROR": {
      return {
        ...state,
        signup_error: action.payload,
      };
    }
    case "FIREBASE_DATA_FETCH": {
      return {
        ...state,
        firebase_error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
