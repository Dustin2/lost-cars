import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from "../colors";
///this is the attempt to create a custom drawer

export default function CustomMenu(props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#283541'}}>
      <View
        style={{
          height: 200,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}
       

        />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  DrawerColor: {
    backgroundColor: "gray",
    flex: 1,
  },
});
