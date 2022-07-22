import React, { useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Button } from "react-native-web";
import { Colors } from "../colors";
import * as Location from "expo-location";

import Navbar from "../components/Navbar";
export function Map() {
  const [location, setlocation] = useState({
    location: "",
  });

  const LocationModifier = () => {};

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.24997,
          longitude: -103.72714,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 19.2390127, longitude: -103.6986193 }}
          pinColor="gold"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent);
          }}
        >
          <Callout>
            <Text>yellow car lost here!</Text>
          </Callout>
        </Marker>
        <Circle
          center={{ latitude: 19.2390127, longitude: -103.6986193 }}
          radius={200}
          strokeColor="gold"
          fillColor="gold"
        />
        <Marker
          coordinate={{ latitude: 19.24997, longitude: -103.72714 }}
          pinColor="red"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent);
          }}
        >
          <Callout>
            <Text>read car lost here!</Text>
          </Callout>
        </Marker>
        <Circle
          center={{ latitude: 19.24997, longitude: -103.72714 }}
          radius={200}
          strokeColor="red"
          fillColor="red"
        />

        <Marker
          coordinate={{ latitude: 19.2334506, longitude: -103.7122287 }}
          pinColor="green"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent);
          }}
        >
          <Callout>
            <Text>yellow car lost here!</Text>
          </Callout>
        </Marker>
        <Circle
          center={{ latitude: 19.2334506, longitude: -103.7122287 }}
          radius={200}
          strokeColor="green"
          fillColor="green"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  //this important because show the map in devices

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
