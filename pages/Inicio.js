import { FlatList, Text, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Navbar } from "../components/Navbar";


export function Inicio() {
  
  return (
    <View l={styles.container}>
     
      <Navbar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
