import isEmpty from "is-empty";
import React, { useState, useEffect, useCallback } from "react";
import firebase from "../../firebase";
import {
  useNavigation,
  useRoute,
  useLinkProps,
} from "@react-navigation/native";
import { Provider } from "react-redux";

export default function useProduct(query) {
  const [gotProducts, setGotProduct] = useState([]);
  const [input, setInput] = useState();
  const router = useRoute();

  useEffect(() => {
    SolveProductt();
  }, [input]);

  const SolveProductt = async () => {
    const collection = firebase.firestore().collection("products");

    collection.onSnapshot(
      (querySnapshot) => {
        const newEntities = [];

        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        const data = [];

        newEntities.map((res) => {
          if (res.text === input) {
            data.push(res);
          }
        });

        setGotProduct(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return [gotProducts, setInput];
}
