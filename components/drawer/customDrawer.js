import React from "react";
import { View,StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList,} from "@react-navigation/drawer";


export function CustomDrawer(props){
    return (
        <View styles={{flex:1,backgoundColor:'#283541'}}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    )
}

const styles= StyleSheet.create({
   
});