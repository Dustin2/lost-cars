import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ToastAndroid,
  Button,
} from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { TextInput } from "react-native-paper";

//externals dependencies
import Textarea from "react-native-textarea";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";

import { places } from "../Places";
// end externals dependencies

///Firebase end
import { Colors } from "../colors"; //colors change color button
import { database } from "../Firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";

//icons
import { Entypo } from "@expo/vector-icons";

//state initial
const initialState = {
  name: "",
  colony: "",
  place: "",
  date: "",
  typeVehicle: "",
  plaque: "",
  color: "",
  description: "",
  selectedDate: "",
};

export function CreateUserScreen(props) {
  ///usestate where save temporal data
  const [user, setUsers] = useState(initialState);
  ///clear state

  ///change value
  const handleChangeText = (name, value) => {
    setUsers({ ...user, [name]: value });
    //recibira un nombre y un valor estableciendo el nombre y valor recibido y actualizando
  };

  ///sendData to firebase
  const sendData = async () => {
    await addDoc(collection(database, "actas"), {
      name: user.name,
      colony: user.colony,
      place: user.place,
      date: user.date,
      typeVehicle: user.typeVehicle,
      plaque: user.plaque,
      color: user.color,
      description: user.description,
      // createdDoc: servnewerTimestamp(),
      createdDoc: new Date(),
    });
    setUsers(initialState);

    ///use this change screen after save data
    props.navigation.navigate("Actas Recientes");
  };
  /// sendData

  //saveNewUser
  const saveNewUser = () => {
    if (
      user.name === "" ||
      user.colony === "" ||
      user.date === "" ||
      user.typeVehicle === "" ||
      user.plaque === "" ||
      user.color === "" ||
      user.description === ""
    ) {
      Alert.alert(
        "Error Campos invalidos",
        "Porfavor copleta todos los campos"
      );
    } else {
      Alert.alert("Confirmar", "Desea guardar los cambios actuales?", [
        {
          text: "Cancelar",
          onPress: () => ToastAndroid.show("cancel!", ToastAndroid.SHORT),
          style: "cancel",
        },
        {
          text: "Guardar",
          onPress: () => (
            sendData(),
            ToastAndroid.show("Acta registrada con exito!", ToastAndroid.SHORT)
          ),
          style: "success",
        },
      ]);
    }
  }; //end saveNewUser

  ///Modal TimePickerModal
  const [selectedDate, setSelectedDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    handleChangeText("date", date);
    hideDatePicker();
  };
  /// end Modal TimePickerModal

  ///Update Colony
  const [selectedColony, setSelectedColony] = useState();
  const updatePickerColony = (colonySel, indexColony, name, value) => {
    handleChangeText("colony", colonySel);
    setSelectedColony(colonySel);
  };
  ///Update Colony
  const [selectedColony1, setSelectedColony1] = useState();
  const updatePickerColony1 = (vehicleSel, indexVehicle, name, value) => {
    handleChangeText("typeVehicle", vehicleSel);
    setSelectedColony1(vehicleSel);
  };
  //places for select

  return (
    <ScrollView style={styles.container}>
      {/* name Input */}
      <View>
        <TextInput
          value={user.name}
          mode="outlined"
          label="Nombre de la persona que levanta el acta "
          activeOutlineColor={Colors.info} //use for change color around text input
          onChangeText={(value) => {
            handleChangeText("name", value);
          }}
        />
      </View>

      {/* date Picker */}
      <View>
        <TextInput
          editable={false}
          mode="outlined"
          style={{ marginBottom: 10 }}
        >
          {selectedDate
            ? moment(selectedDate).format("MMMM Do YYYY, h:mm a", "es-MX")
            : "Fecha no seleccionada"}
        </TextInput>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          value={user.date}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onPress={(value) => {
            handleChangeText("date", value);
          }}
        />
        <Button
          title="Selecciona la fecha y hora del suceso"
          onPress={showDatePicker}
          color={Colors.secondary}
        />
      </View>
      {/* colony Input */}
      <View>
        <Picker
          selectedValue={selectedColony}
          onValueChange={(colonySel, indexColony, name, value) =>
            updatePickerColony(colonySel, indexColony, name, value)
          }
        >
          <Picker.Item label="Selecciona la colonia" color="#aaa" />
          {places.map((place) => {
            {
              user.place = place.NameOfLocation;
            }
            return (
              <Picker.Item
                key={place.place}
                label={place.NameOfLocation}
                value={place.place}
              />
            );
          })}
        </Picker>
      </View>
      {/* typeVehicle Input */}
      <View>
        <Picker
          value={user.typeVehicle}
          selectedValue={selectedColony1}
          onValueChange={(vehicleSel, indexVehicle, name, value) =>
            updatePickerColony1(vehicleSel, indexVehicle, name, value)
          }
        >
          <Picker.Item
            label="Selecciona el vehiculo"
            value="disabled"
            color="#aaa"
          />
          <Picker.Item label="Automovil" value="Automovil" />
          <Picker.Item label="camioneta" value="camioneta" />
          <Picker.Item label="motocicleta" value="motocicleta" />
        </Picker>
      </View>

      {/* plaque Input */}
      <View>
        <TextInput
          label="Placas"
          mode="outlined"
          activeOutlineColor={Colors.info}
          onChangeText={(value) => {
            handleChangeText("plaque", value);
          }}
          value={user.plaque}
        />
      </View>
      {/* color Input */}
      <View>
        <TextInput
          label="Color de auto"
          mode="outlined"
          activeOutlineColor={Colors.info}
          onChangeText={(value) => {
            handleChangeText("color", value);
          }}
          value={user.color}
        />
      </View>
      {/* descripcion Input */}
      <View>
        <TextInput
          style={{ marginBottom: 10 }}
          value={user.description}
          label="descripcion de lo sucedido"
          mode="outlined"
          multiline={true}
          numberOfLines={2}
          activeOutlineColor={Colors.info}
          onChangeText={(value) => {
            handleChangeText("description", value);
          }}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button
          color={Colors.success}
          title={"Guardar"}
          onPress={() => {
            saveNewUser();
            console.log(user);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    //  backgroundColor: '#d3d3d3',
  },
  inputGroup: {
    flex: 1,
    padding: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    fontSize: 17,
    marginBottom: 10,
    marginEnd: 10,
  },
});
