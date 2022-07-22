import react from 'react';
import {Text,View,TextInput,StyleSheet} from "react-native";
import { Searchbar } from 'react-native-paper';
export function Navbar(){
   
    return(
        <View >
            <Searchbar style={styles.serchInput}/>
          
        </View>
        );
}

const styles = StyleSheet.create({
    serchInput: {
        width: '100%',
        height: 50,
       fontSize: 17,
       backgroundColor:"gray",
    },
    containeserchInput:{
        width: '100%',
        height: 50,
        backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius:8,

    }
}
    )

