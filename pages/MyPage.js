import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import firebase from "../firebase";

const Mypage = () => {
  const [user, setuser] = useState();
  const [products, setProducts] = useState([]);
  const { possible } = useSelector((state) => state.auth);

  useEffect(() => {
    const email = firebase.auth().currentUser.email;

    setuser(email);
  }, []);
  useEffect(() => {
    get_all_products(user);
  }, [user]);

  async function get_all_products() {
    const myData = ["hokey", "baseball"];
    try {
      const collection = await firebase.firestore().collection("products");
      collection.where("user", "==", user).onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
            const my = newEntities
              .filter((value) => value.category === "hockey")
              .filter((value) => value.text === "Ipad");
            setProducts(my);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log("error");
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={(item) => (
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                marginVertical: 8,

                fontWeight: "500",
                alignSelf: "center",
                backgroundColor: "#f0ffff44",
                borderRadius: 9,
                borderColor: "black",
                borderWidth: 1,
                lineHeight: 34,
                fontSize: 18,
                letterSpacing: 0.1,
                paddingLeft: 22,
              }}>
              {item.item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        key={Math.random()}
        style={{
          width: 400,

          right: -22,
          maxHeight: 230,
          left: -66,
          top: 44,
          paddingTop: 22,
          position: "absolute",
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
export default Mypage;
