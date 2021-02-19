import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function useCategory() {
  const [category, setCategory] = useState();
  return [category, setCategory];
}
