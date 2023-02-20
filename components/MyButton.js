import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

class MyButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.type == "main") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'myfont',
                        fontSize: 90
                    }}>GeoApp</Text>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'myfontBold',
                        fontSize: 18,
                    }}>"Find, save, remember by Google Maps"</Text>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "menu_d") {
            return (
                <TouchableOpacity style={styles.button_main} onPress={() => this.props.testPress()}>
                    <Text style={styles.text}>Download and save your position</Text>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "menu_r") {
            return (
                <TouchableOpacity style={styles.button_main} onPress={() => this.props.testPress()}>
                    <Text style={styles.text}>Remove all data</Text>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "menu_m") {
            return (
                <TouchableOpacity style={styles.button_main} onPress={() => this.props.testPress()}>
                    <Text style={styles.text}>Go to map</Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button_main: {
        width: 400,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'myfont',
        fontSize: 18,
        color: 'white',
    },
    image: {
        width: 150,
        height: 150,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
    }
});

export default MyButton;
