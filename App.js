import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducer from "./redux/reducers/combineReducer";
import MainStck from "./Stacks/MainStck";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./Stacks/AuthStack";
import Lottie from "./components/FirstPageSvg";
import firebase from "./firebase";

//create redux store

const store = createStore(
  combineReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [logedin, setLogedin] = useState(false);

  //check login
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLogedin(true);
      } else {
        // No user is signed in.
        setLogedin(false);
      }
    });
  }, []);
  //show animation before app start
  return (
    <Provider store={store}>
      {!loading ? (
        <Lottie load={(value) => setLoading(value)} />
      ) : (
        <NavigationContainer>
          {!logedin ? <AuthStack /> : <MainStck />}
        </NavigationContainer>
      )}
    </Provider>
  );
}
