//Dependeces//
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

//navigation//
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import { Colors } from "./colors";

///screens//
import { Contacto } from "./screens/Contacto";
import { Inicio } from "./screens/Inicio";
import { CreateUserScreen } from "./screens/CreateUserScreen";
import { Map } from "./screens/Map";

///components//
import CustomMenu from "./components/CustomMenu";
//icons//
import Ionicons from "@expo/vector-icons/Ionicons";

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
          name="Reportes recientes"
          component={Inicio}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />

        <Menu.Screen
          name="Crear reporte"
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
            headerTitle: "Crear Actas",
          }}
        />
        <Menu.Screen
          name="Mapa"
          component={Map}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="map-outline" size={22} color={color} />
            ),
            headerTitle: "Mapa",
          }}
        />
        <Menu.Screen
          name="Indice de robos"
          component={Contacto}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="bar-chart-sharp" size={22} color={color} />
            ),
            //the  above lines make it work the icons in the drawer
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitle: "Graficas",
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
