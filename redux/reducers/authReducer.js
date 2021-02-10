const INITIAL_STATE = {
  current: [],
  possible: [],
  allGotProducts: [],
  user: "",
  logout: false,
  signed_user: "",
  route: null,
  token: "",
  usi: "",
  email: "",
  loaded: false,
  categorys: null,
  all:[]
};

export function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_LOADED": {
      return {
        ...state,
        loaded: action.payload,
      };
    }
    case "GET-ALL": {
      return {
        ...state,
        all: action.payload,
      };
    }
    case "GET_FIREBASE": {
      return {
        ...state,
        possible: action.payload,
      };
    }
    case "GET_TOKEN": {
      return {
        ...state,
        token: action.payload,
      };
    }

    case "GET_ALL_PRODUCTS": {
      return {
        ...state,
        allGotProducts: action.payload,
      };
    }
    case "SET_CATEGORYS": {
      return {
        ...state,
        categorys: action.payload,
      };
    }
    case "SET_EMAIL": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "GET_USER": {
      return {
        ...state,
        Createduser: action.payload,
      };
    }
    case "GET_CURRENT_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "ROUTE": {
      return {
        ...state,
        route: action.payload,
      };
    }
    case "SIGN_USER": {
      return {
        ...state,
        signed_user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        logout: true,
      };
    }
    default: {
      return state;
    }
  }
}
