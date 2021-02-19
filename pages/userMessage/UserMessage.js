import React, { useState, useEffect, useCallback, useRef } from "react";

import { useSelector } from "react-redux";
import firebase from "firebase";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  Button,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function UserMessage() {
  const inputRef = useRef();
  const [message, setMessage] = useState();
  const { user } = useSelector((state) => state.userState);
  const [saved, setSaved] = useState(false);
  const [gotMessage, setGotMessage] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const save_on_db = async (e) => {
    e.preventDefault();
    try {
      const collection = await firebase.firestore().collection("messages");
      collection.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        message: {
          user: {
            name: "Chris",
          },
          body: message,
        },
      });
    } catch (err) {
      Alert(err);
    } finally {
      inputRef.current.value = "";
    }
  };
  const getMessages = async () => {
    try {
      const collection = await firebase.firestore().collection("messages");

      collection
        .orderBy("createdAt")
        .limitToLast(10)
        .onSnapshot((querySnapshot) => {
          const newEntities = [];

          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
            return newEntities;
          });

          const messages = [];
          newEntities.map((res) => {
            messages.push(res.message.body);
          });
          setGotMessage(messages);
        });
    } catch (err) {
      Alert(err);
    }
  };

  return (
    <View
      style={{
        margin: "auto",
        justifyContent: "center",
        width: "70vw",
        marginTop: "69px",
      }}>
      <View>
        <View>
          {gotMessage.map((res) => {
            return (
              <p
                style={{ marginLeft: "14px" }}
                key={gotMessage.length * Math.random()}>
                {res}
              </p>
            );
          })}
        </View>
      </View>
      <TouchableOpacity onPress={(e) => save_on_db(e)}>
        <Text>write</Text>
        <TextInput
          type="email"
          placeholder="Enter email"
          onChange={(e) => setMessage(e.target.value)}
          placeholder={"message"}
          ref={inputRef}
        />

        <Button title="submit" type="submit">
          Submit
        </Button>
      </TouchableOpacity>
    </View>
  );
}
