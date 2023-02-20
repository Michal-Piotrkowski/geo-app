import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MyButton from './MyButton';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return ( 
            <View style={{ flex: 1}}>
                <View style={styles.container}>
                    <Image source={require("../images/mountains.jpg")} style={styles.image} />
                    <MyButton type="main" testPress={() => this.props.navigation.navigate("s2")} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    textAlign: 'center',
  }
});

export default Main;
