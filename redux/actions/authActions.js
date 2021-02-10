import firebase from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value) => {
  try {
    if (value) {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem("@storage_Key", jsonValue);
    }
  } catch (e) {
    // saving error
    console.log("cant store on asyncstorage");
  }
};

export const logOut = (dispatch) => {
  return async () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Signed Out");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  };
};

export const getUser = (dispatch) => {
  return async (username, pass, name) => {
    try {
      let userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(username, pass);
      let userr = userCredential.user;

      if (userr) {
        dispatch({ type: "GET_USER", payload: userr });

        userr.updateProfile({ displayName: name });
      }
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("error on create user");
      dispatch({ type: "SIGNUP_ERROR", payload: errorMessage });
    }
  };
};

export const signUser = (dispatch) => {
  return async (username, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);

      // Signed in
      let userr = userCredential.user;
      if (userr) {
        dispatch({ type: "SIGN_USER", payload: userr });
      }

      // ...
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      dispatch({ type: "LOGIN_ERROR", payload: errorMessage });
    }
  };
};

export const getRoute = (dispatch) => {
  return async (nav) => {
    dispatch({ type: "ROUTE", payload: nav });
  };
};

export const getCurrentUser = (dispatch) => {
  return (user) => {
    dispatch({ type: "GET_CURRENT_USER", payload: user });
  };
};
