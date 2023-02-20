import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import * as Font from "expo-font";
import Main from "./components/Main"
import Menu from "./components/Menu"
import Map from "./components/Map"
import MyButton from "./components/MyButton"

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontloaded: false };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      'myfont': require('./fonts/Montserrat-Thin.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
      'myfontBold': require('./fonts/Montserrat-SemiBold.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });
    this.setState({ fontloaded: true })
  }

  render() {
    return (this.state.fontloaded ?
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="s1"
            component={Main}
            options={{
              headerShown: false
            }} />
          <Stack.Screen
            name="s2"
            component={Menu}
            options={{
              title: 'Save Position',
              headerShown: true,
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: '300',
              },
            }} />
          <Stack.Screen
            name="s3"
            component={Map}
            options={{
              title: 'Choose location',
              headerShown: true,
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: '300',
              },
            }} />
        </Stack.Navigator>
      </NavigationContainer>
      :
      null
    )
  }
}
