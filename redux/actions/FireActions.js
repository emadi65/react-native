import isEmpty from "is-empty";

import firebase from "../../firebase";

export function get_all_products(dispatch) {
  return async (search, categoryy) => {
    try {
      const collection = firebase.firestore().collection("products");
      collection.onSnapshot(
        (querySnapshot) => {
          const newEntities = [];

          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });

          const my = newEntities.filter((value) =>
            value.category?.includes(categoryy)
          );
          const data = [];
          my.map((res) => {
            if (!isEmpty(search)) {
              if (res.text?.includes(search)) {
                data.push(res);
              }
            }
          });

          dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: !isEmpty(search) ? data : my,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log("error");
    }
  };
}

export function FireActions(dispatch) {
  const ff = [];
  return async (search, categoryy) => {
    try {
      const collection = await firebase.firestore().collection("products");
      if (!isEmpty(categoryy)) {
        collection.where("category", "==", categoryy).onSnapshot(
          (querySnapshot) => {
            if (!isEmpty(search)) {
              const newEntities = [];
              querySnapshot.forEach((doc) => {
                const entity = doc.data();
                entity.id = doc.id;
                newEntities.push(entity);
                var arr = [];
                newEntities.map((res) => {
                  if (search) {
                    if (res.text?.includes(search)) {
                      arr.push(res);

                      dispatch({
                        type: "GET_FIREBASE",
                        payload: arr,
                      });
                    }
                  }
                });
              });
            } else {
              const newEntities = [];

              querySnapshot.forEach((doc) => {
                const entity = doc.data();
                entity.id = doc.id;
                newEntities.push(entity);
              });

              dispatch({
                type: "GET_FIREBASE",
                payload: newEntities,
              });
            }
          },
          (error) => {
            console.log(error);
            dispatch({
              type: "FIREBASE_ERROR",
              payload: "Cant connect to database",
            });
          }
        );
      } else {
        collection.onSnapshot(
          (querySnapshot) => {
            if (!isEmpty(search)) {
              const newEntities = [];
              querySnapshot.forEach((doc) => {
                const entity = doc.data();
                entity.id = doc.id;
                newEntities.push(entity);
                var arr = [];
                newEntities.map((res) => {
                  if (search) {
                    if (res.text?.includes(search)) {
                      arr.push(res);
                      dispatch({
                        type: "GET_FIREBASE",
                        payload: arr,
                      });
                    }
                  }
                });
              });
            } else {
              const newEntities = [];
              querySnapshot.forEach((doc) => {
                const entity = doc.data();
                entity.id = doc.id;
                newEntities.push(entity);
              });

              dispatch({
                type: "GET_FIREBASE",
                payload: newEntities,
              });
            }
          },
          (error) => {
            console.log(error);
            dispatch({
              type: "FIREBASE_ERROR",
              payload: "Cant connect to database",
            });
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function set_User_Db(dispatch) {
  return async (username, phoneNumber, nickName) => {
    try {
      const Usercollection = await firebase.firestore().collection("Users");
      await Usercollection.add({ username, phoneNumber, nickName });
    } catch (err) {
      console.log(err);
    }
  };
}
export function setCategorys(dispatch) {
  return async (categorys) => {
    if (!isEmpty(categorys)) {
      try {
        dispatch({ type: "SET_CATEGORYS", payload: categorys });
      } catch (err) {
        console.log(err);
      }
    }
  };
}

export async function setSellItem(
  category,
  text,
  tag,
  description,
  images,
  price,
  user
) {
  try {
    if (text) {
      const collection = await firebase.firestore().collection("products");
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        category,
        text,
        tag,
        description,
        createdAt: timestamp,
        images,
        price,
        user: user?.email,
      };
      collection.add(data);
    }
  } catch (err) {
    console.log("error happend");
  }
}

export async function getUserPage(user) {
  try {
    if (text && tag.length > 0) {
      const collection = await firebase.firestore().collection("products");
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        category,
        text,
        tag,
        createdAt: timestamp,
        images,
        price,
      };
      collection.add(data);
    }
  } catch (err) {
    console.log("error happend");
  }
}
