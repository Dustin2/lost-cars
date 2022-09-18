import * as React from "react";
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
    Button,
    ToastAndroid,
    Text,
  } from "react-native";
  import { ListItem } from "react-native-elements";
import { database } from "../../Firebase/Firebase";
import { delateDoc, doc, updateDoc,serverTimestamp} from "firebase/firestore";


export function  showActas(props){
  return(
    <View styles={styles.container}>
    <Button
      color={Colors.success}
      title={"ADD"}
      onPress={() => {
        ///use this change screen to add new acta
        props.navigation.navigate("Crear Actas");
      }}
    />
    <ScrollView>
      {acta.map((actas) => {
        return (
          /// key={actas.id} use for know who component is who without repeat anyone
          <ListItem bottomDivider key={actas.id}>
            <ListItem.Chevron />
            <Avatar
              rounded={true}
              source={{
                uri: "https://randomuser.me/api/portraits/men/36.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>Folio:{actas.id}</ListItem.Title>
              {/* <ListItem.Subtitle>{actas.moment(createdDoc).format("MMMM Do YYYY, h:mm a", "es-MX")}</ListItem.Subtitle> */}
              <ListItem.Subtitle>{actas.name}</ListItem.Subtitle>
              <ListItem.Subtitle>{actas.colony.latitude}</ListItem.Subtitle>
              <ListItem.Subtitle>{actas.colony.longitude}</ListItem.Subtitle>
              <ListItem.Subtitle>{actas.typeVehicle}</ListItem.Subtitle>
              <ListItem.Subtitle>{actas.color}</ListItem.Subtitle>
              <ListItem.Subtitle>{actas.plaque}</ListItem.Subtitle>
              <ListItem.Subtitle>{actas.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

          // <Avatar source={{uri: item.avatar_url}} />
        );
      })}
    </ScrollView>
  </View>
  )

}

const styles = StyleSheet.create({
    container:{
        padding:16,
        background:"#FFFF",
        margin:16,
        borderRadius:8,
    }
})

