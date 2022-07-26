//Dependeces
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Colors } from "./colors";

///pages//
import { Contacto } from "./pages/Contacto";
import { Inicio } from "./pages/Inicio";
import CreateUserScreen from "./pages/CreateUserScreen";
import { Map } from "./pages/Map";

///components//
import CustomMenu from "./components/CustomMenu";
//icons//
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from "@expo/vector-icons";

{
  /* this use for change status bar color  */
}
import { StatusBar } from "expo-status-bar";
import { View } from "react-native-web";

const Menu = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Menu.Navigator
        drawerContent={(props) => <CustomMenu {...props} />}
        ///that use for change aparence to all screens
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.info,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          //change color to active and inactive
          drawerActiveBackgroundColor: "#6685A4",
          drawerActiveTintColor: "#333",
          drawerInactiveTintColor: "#fff",
        }}
      >
        <Menu.Screen
          name="Actas recientes"
          component={Inicio}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />

        <Menu.Screen
          name="Crear Actas"
          component={CreateUserScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="add" size={22} color={color} />
            ),

            //the  above lines make it work the icons in the drawer
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Menu.Screen
          name="Mapa"
          component={Map}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="map-outline" size={22} color={color} />
            ),
          }}
        />
        <Menu.Screen
          name="Contacto"
          component={Contacto}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={22} color={color} />
            ),
            ///this use for change color of header

            //the  above lines make it work the icons in the drawer
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Menu.Navigator>

      {/* this use for change status bar color  */}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: "#6aa3b4",
  },
  headerText: {
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: 1,
  },
});
