import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, FlatList } from 'react-native';
import MyButton from './MyButton';
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isEnabled: false, singleSwitches: []}
  }

    componentDidMount = async () => {
      await this.getAllData()
    }

  setData = async (data) => {
    await AsyncStorage.setItem('key' + this.state.data.length, data);
    await this.getAllData()
  }

  getData = async () => {
    let val = await AsyncStorage.getItem('key1');
    await this.getAllData()
  }

  getAllData = async () => {
    let keys = await AsyncStorage.getAllKeys();
    let stores = await AsyncStorage.multiGet(keys);
    this.setState({
      data: [],
      singleSwitches: [],
    })
    let maps = stores.map((result, i, store) => {
      let key = store[i][0];
      let value = store[i][1];
      try {
        this.setState({
          data: this.state.data.concat({locations: JSON.parse(store[i][1]).coords, info: {key: store[i][0], timestamp: JSON.parse(store[i][1]).timestamp}}),
          singleSwitches: this.state.singleSwitches.concat([false])
        })
      } catch (err) {
        console.log('Error:', err);
      }
    });
  }

  removeAllData = async () => {
    await AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(this.setState({
      data: []
    }))
    .then(() => alert('success'));
    await this.getAllData()
  }

  getPosition = async () => {
    await Location.requestForegroundPermissionsAsync();
    let pos = await Location.getCurrentPositionAsync({})
    this.setData(JSON.stringify(pos, null, 4))
    await this.getAllData()
  }

  renderMap = async () => {
    let toRender = []
    let i = 0
    this.state.singleSwitches.forEach(element => {
      if(element != false){
        toRender.push(this.state.data[i])
      }
      i++
    });
    await this.getAllData()
    await this.props.navigation.navigate("s3", { data: toRender })
  }

  toggle(index) {
    if(index == 'main'){
      this.setState({ isEnabled: !this.state.isEnabled });
        for(let i = 0; i < this.state.singleSwitches.length; i++){
          let newItems = this.state.singleSwitches;
          if(this.state.isEnabled != true){
            newItems[i] = true
          }
          else{
            newItems[i] = false
          }
          this.setState({ 
              singleSwitches: newItems 
          });
        }
        console.log( this.state.singleSwitches)
      return
    }
    index = index.charAt(3)
    let newItems = this.state.singleSwitches;
    console.log("OLD: " + this.state.singleSwitches)
    newItems[index] = !this.state.singleSwitches[index];
    this.setState({ 
      singleSwitches: newItems 
    });
    console.log("NEW: " + this.state.singleSwitches)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{
          marginTop: 100,
          textAlign: 'center',
          fontFamily: 'myfont',
          fontSize: 90
        }}>GeoApp</Text>
        <View style={styles.container}>
          <MyButton type="menu_d" testPress={() => this.getPosition()} />
          <MyButton type="menu_r" testPress={() => this.removeAllData()} />
          <MyButton type="menu_m" testPress={() => this.renderMap()} />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Switch
            trackColor={{ false: "gray", true: "black" }}
            thumbColor={this.state.isEnabled ? "white" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => this.toggle('main')}
            value={this.state.isEnabled}
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          />
          <View
            style={styles.list}
          >
            <FlatList
              data={this.state.data}
              renderItem={
                ({item}) => 
                  <View style={styles.item}>
                    <Image source={require("../images/icon.png")} style={styles.image_icon} />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.itemText}>timestamp: {item.info.timestamp}</Text>
                      <Text style={styles.itemText}>longitude: {item.locations.longitude}</Text>
                      <Text style={styles.itemText}>latitude: {item.locations.latitude}</Text>
                    </View>
                    <Switch
                      trackColor={{ false: "gray", true: "black" }}
                      thumbColor={this.state.singleSwitches[item.info.key] ? "white" : "white"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => this.toggle(item.info.key)}
                      value={this.state.singleSwitches[item.info.key.charAt(3)]}
                      style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                    />
                  </View>
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    textAlign: 'center',
  },
  image_icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'myfont',
    fontSize: 18,
    color: 'white',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'myfont',
    fontSize: 18,
    marginBottom: 10
  },
  list: {
    marginBottom: 50,
  },
  itemText: {
    fontSize: 15,
    marginRight: 8,
  }
});

export default Menu;