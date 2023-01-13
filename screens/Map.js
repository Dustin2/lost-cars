import React, { useState, useEffect } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Button } from "react-native-web";
import { Colors } from "../colors";
// import * as Location from "expo-location";

import { ListItem } from "react-native-elements";
//firebase
import { database } from "../Firebase/Firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  querySnapshot,
  doc,
} from "firebase/firestore";

import moment from "moment";
export function Map() {
  const [acta, setActa] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "actas");
    const q = query(collectionRef, orderBy("place", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setActa(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          colony: doc.data().colony,
          date: doc.data().date.moment().format(),
          typeVehicle: doc.data().typeVehicle,
          plaque: doc.data().plaque,
          color: doc.data().color,
          description: doc.data().description,
          createdDoc: doc.data().createdDoc,
        }))
      );
    });
    return unsubscribe;
  }, []);
  console.log(date);
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
        {acta.map((actas) => {
          return (
            <MapView.Marker
              key={actas.id}
              coordinate={actas.colony.place}
              pinColor="#138A36"
            >
              <Callout>
                <Text> Ultimo reporte {actas.name}</Text>
                <Text>Fecha: {actas.date}</Text>
              </Callout>
            </MapView.Marker>
          );
        })}
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
