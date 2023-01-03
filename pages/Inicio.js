//importantly
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import { Colors } from "../colors";
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

export function Inicio(props) {
  const [acta, setActa] = useState([]);
  useEffect(() => {
    const collectionRef = collection(database, "actas");
    const q = query(collectionRef, orderBy("colony", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      const datos = [];
      setActa(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          colony: doc.data().colony,
          place: doc.data().place,
          date: doc.data().date,
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

  /// [] in useEffect serves  for function  run olny once
  return (
    <View styles={styles.container}>
      <Button
        color={Colors.success}
        title={"NUEVA ACTA"}
        onPress={() => {
          ///use this change screen to add new acta
          props.navigation.navigate("Crear Actas");
        }}
      />
      <SafeAreaView>
        <ScrollView>
          {acta.map((actas) => {
            return (
              <ListItem
                bottomDivider
                key={actas.id}
                onPress={() => {
                  props.navigation.navigate("Mapa"),
                    {
                      color: actas.color,
                    };
                }}
              >
                <ListItem.Chevron />
                <Avatar
                  rounded={true}
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>Folio:{actas.id}</ListItem.Title>
                  <ListItem.Subtitle>{actas.name}</ListItem.Subtitle>
                  <ListItem.Subtitle>{actas.place}</ListItem.Subtitle>
                  <ListItem.Subtitle>{actas.typeVehicle}</ListItem.Subtitle>
                  <ListItem.Subtitle>{actas.color}</ListItem.Subtitle>
                  <ListItem.Subtitle>{actas.plaque}</ListItem.Subtitle>
                  <ListItem.Subtitle>{actas.description}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
});
