import React, { useRef, useEffect, useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Svg, {
  Ellipse,
  G,
  TSpan,
  Use,
  Text,
  LinearGradient,
  Defs,
  Stop,
} from "react-native-svg";
import Lottie from "lottie-react-native";

export default function FirstPageSvg({ load }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 0,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 1000,
    }).start();
  };

  useEffect(() => {
    fadeOut();
    setTimeout(() => {
      fadeIn();
    }, 2000);
  }, []);

  const ellipseRef = useRef();

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={{ height: "100%", width: "100%" }}>
        <Lottie
          autoPlay
          loop={false}
          onAnimationFinish={() => load(true)}
          loading={loading}
          source={require("../assets/data1.json")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
