import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase('contacts.db')
import Contacts from "./screens/Contacts";
import Profile from "./screens/profile";
import CreateContacts from "./screens/createContacts";
import SearchScreen from './screens/searchScreen';
export default function App() {
  useEffect(()=>{
     db.transaction(tx=>{
       tx.executeSql('create table contact(id integer primary key autoincrement, name text ,phone text,email text)')
     },[],()=>console.log('table created successfully')); 
  })
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen name="Contacts" component={Contacts}
            options={({navigation})=>({
              headerRight:()=>(
                <TouchableOpacity style={{paddingRight:20}} onPress={()=> navigation.navigate('Sreach')}>
                  <Text>
                    <MaterialIcons name="search" size={24} color="black"/>
                  </Text>
                </TouchableOpacity>
              )
            })} />
           <Stack.Screen name="CreateContact" component={CreateContacts} />
           <Stack.Screen name="Profile" component={Profile} />
           <Stack.Screen name="Sreach" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f8f4f4"
  },
});
