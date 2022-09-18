import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Button,
  ToastAndroid,
  SafeAreaView,
  Text,
} from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

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

//state initial
const initialState = {
  name: "",
  colony: "",
  date: "",
  typeVehicle: "",
  plaque: "",
  color: "",
  description: "",
};

export function CreateUserScreen(props) {
  ///usestate where save temporal data
  const [state, setState] = useState(initialState);
  ///clear state

  ///change value
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
    //recibira un nombre y un valor estableciendo el nombre y valor recibido y actualizando
  };

  ///sendData to firebase
  const sendData = async () => {
    await addDoc(collection(database, "actas"), {
      name: state.name,
      colony: state.colony,
      date: state.date,
      typeVehicle: state.typeVehicle,
      plaque: state.plaque,
      color: state.color,
      description: state.description,
      // createdDoc: servnewerTimestamp(),
      createdDoc: new Date(),
    });
    setState(initialState);

    ///use this change screen after save data
    props.navigation.navigate("Actas Recientes");

    ///serverTimestamp is used for save date to create document with firebase
  };
  /// sendData

  //saveNewUser
  const saveNewUser = () => {
    if (
      state.name === "" ||
      state.colony === "" ||
      state.date === "" ||
      state.typeVehicle === "" ||
      state.plaque === "" ||
      state.color === "" ||
      state.description === ""
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
  const [selectedDate, setSelectedDate] = useState('');
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
    setSelectedVehicle(colonySel);
  };
  //places for select

  //Update TypeVehicle
  const [selectedVehicle, setSelectedVehicle] = useState();
  const updatePickerTypeVehicle = (vehicleSel, indexVehicle, name, value) => {
    handleChangeText("typeVehicle", vehicleSel);
    setSelectedVehicle(vehicleSel);
  };

  ///update
  return (
    <ScrollView style={styles.container}>
      {/* name Input */}
      <View>
        <TextInput placeholder="Nombre de la persona que levanta el acta " />
        <TextInput
        value={state.name}
          style={styles.inputGroup}
          onChangeText={(value) => {
            handleChangeText("name", value);
          }}
        />
      </View>

      {/* date Picker */}
      <View>
        <TextInput placeholder='Fecha de los acontecimientos'  editable={false} />
        <TextInput
          style={styles.textDate}
          editable={false}
        
        >
          {  selectedDate
            ? moment(selectedDate).format("MMMM Do YYYY, h:mm a", "es-MX")
            : "Fecha no seleccionada"}
       
        </TextInput>

        <Button
          title="Selecciona la fecha y hora"
          onPress={showDatePicker}
          color={Colors.secondary}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onPress={(value) => {}}
        />
      </View>

      {/* colony Input */}
      {/** remeber in features version Picker extracted core react-native and do you need installing with the repository */}
      <View>
        <Picker
          selectedValue={selectedColony}
          onValueChange={(colonySel, indexColony, name, value) =>
            updatePickerColony(colonySel, indexColony, name, value)
          }
        >
          <Picker.Item label="Selecciona la colonia" color="#aaa" />
          {places.map((place) => {
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
        value={state.typeVehicle}
          selectedValue={selectedVehicle}
          onValueChange={(vehicleSel, indexVehicle, name, value) =>
            updatePickerTypeVehicle(vehicleSel, indexVehicle, name, value)
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
          placeholder="Placas"
          style={styles.inputGroup}
          onChangeText={(value) => {
            handleChangeText("plaque", value);
          }}
          value={state.plaque}
        />
      </View>
      {/* color Input */}
      <View>
        <TextInput
          placeholder="Color de auto"
          style={styles.inputGroup}
          onChangeText={(value) => {
            handleChangeText("color", value);
          }}
          value={state.color}
        />
      </View>
      {/* descripcion Input */}
      <View>
        <Textarea
          style={styles.textarea}
          // underlineColorAndroid={"transparent"}
          value={state.description}
          maxLength={1500}
          placeholder={"Inserte la breve descripcion de lo sucedido。"}
          onChangeText={(value) => {
            handleChangeText("description", value);
          }}
        />
      </View>
      <View>
        <Button
          color={Colors.success}
          title={"Guardar"}
          onPress={() => {
            saveNewUser();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    //  backgroundColor: '#d3d3d3',
  },
  inputGroup: {
    flex: 1,
    padding: 1,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    fontSize: 17,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  containerta: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textareaContainer: {
    height: 180,
    padding: 3,
    backgroundColor: "#F5FCFF",
    lineHeight: 35,
  },
  textarea: {
    textAlignVertical: "top",
    height: 170,
    fontSize: 17,
    color: "#333",
    lineHeight: 35,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    alignSelf: "center",
    color: Colors.primary,
    lineHeight: 35,
  },
  textDate: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    fontSize: 17,
    lineHeight: 35,
  },
});
