import React, { useState } from "react";
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

//externals dependencies
import Textarea from "react-native-textarea";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
// end externals dependencies



///Firebase end
import { Colors } from "../colors"; //colors change color button
import { database } from "../Firebase/Firebase";
import { collection,addDoc} from "firebase/firestore";
import { async } from "@firebase/util";

const CreateUserScreen = () => {
  const [state, setState] = useState({
    name: "",
    //   numberActa: "",
    colony: "",
    date: "",
    typeVehicle: "",
    plaque: "",
    color: "",
    description: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
    //recibira un nombre y un valor estableciendo el nombre y valor recibido y actualizando
  };

///sendData
  const sendData = async () => {
  await  addDoc(collection(database,'actas'),{  name: state.name,
      typeVehicle: state.typeVehicle,
      plaque: state.plaque,}),
    console.log("success"+state)
  }
/// sendData

  //saveNewUser
  const saveNewUser = () => {
    if ( state.name === ""||
      // state.hour === "" ||
      // state.date === "" ||
      state.typeVehicle === "" ||
      state.plaque === "" ||
      state.color === "" ||
      state.description === ""
    ) {
      ToastAndroid.show("Porfavor proporciona datos validos!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Confirmar", "Desea guardar los cambios actuales?", [
        {
          text: "Cancel",
          onPress: () => ToastAndroid.show("cancel!", ToastAndroid.SHORT),
          style: "cancel",
        },
        {
          text: "OK", 
          onPress: () => ( sendData(),ToastAndroid.show("cancel!", ToastAndroid.SHORT)),
          style: "success"}, 
          
       
      ]);
    }
  }; //end saveNewUser

  ///Modal TimePickerModal
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  /// end Modal TimePickerModal

///Update Colony
  const [selectedColony, setSelectedColony] = useState();
  const updatePickerColony = (itemValue, itemIndex, name, value) => {
    handleChangeText("colony", itemValue);
    setSelectedColony(itemValue);
  };
//Update Colony

//Update TypeVehicle
  const [selectedVehicle, setSelectedVehicle] = useState();
  const updatePickerTypeVehicle = (itemValue1, itemIndex, name, value) => {
    handleChangeText("typeVehicle", itemValue1);
    setSelectedVehicle(itemValue1);
  };


  ///update
  return (
    <ScrollView style={styles.container}>
      {/* name Input */}
      <View>
        <TextInput
          placeholder="Nombre de la persona que levanta el acta "
          style={styles.inputGroup}
          onChangeText={(value) => {
            handleChangeText("name", value);
          }}
        />
      </View>

      {/* date Picker */}
      <View>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          style={styles.textDate}
        >
          Fecha:{"\n"}
          {selectedDate
            ? moment(selectedDate).format("ll")
            : "Fecha no seleccionada"}{" "}
        </TextInput>
        {/*toLocaleDateString  works for get date and ('en-GB') its the format to show date*/}

        <TextInput editable={false} style={styles.textDate}>
          Hora:{"\n"}
          {selectedDate
            ? moment(selectedDate).format("LT")
            : "Fecha no seleccionada"}
          {/*toLocaleDateString  works for get date and ('en-GB') its the format to show date*/}
        </TextInput>
        <Button
          title="Selecciona la fecha y hora"
          onPress={showDatePicker}
          color={Colors.secondary}
          onValueChange={() => {}}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      {/* colony Input */}
      {/** remeber in features version Picker extracted core react-native and do you need installing with the repository */}
      <View>
        <TextInput placeholder="Selecciona la colonia" editable={false} />
        <Picker
          selectedValue={selectedColony}
          onValueChange={(itemValue, itemIndex, name, value) =>
            updatePickerColony(itemValue, itemIndex, name, value)
          }
        >
          <Picker.Item label="centro" value="centro" />
          <Picker.Item label="camino real" value="camino real" />
          <Picker.Item label="mirador" value="mirador" />
        </Picker>
      </View>
      {/* typeVehicle Input */}
      <View>
        <TextInput
          placeholder="Selecciona el Tipo de vehiculo"
          editable={false}
        />
        <Picker
          selectedValue={selectedVehicle}
          onValueChange={(itemValue1, itemIndex1, name, value) =>
            updatePickerTypeVehicle(itemValue1, itemIndex1, name, value)
          }
          // onValueChange={(itemValue, itemIndex) => this.setState({typeVehicle:itemValue})}
        >
          <Picker.Item label="Automovil" value="Automovil" />
          <Picker.Item label="camioneta" value="camioneta" />
          <Picker.Item label="motocicleta" value="motocicleta" />
          {/* <Picker.Item label="Otro" value="Otro" /> */}
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
        />
      </View>
      {/* descripcion Input */}
      <View>
        <Textarea
          style={styles.textarea}
          // underlineColorAndroid={"transparent"}
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
            console.log(state);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    //  backgroundColor: '#d3d3d3',
  },
  inputGroup: {
    flex: 1,
    padding: 0,
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

export default CreateUserScreen;
