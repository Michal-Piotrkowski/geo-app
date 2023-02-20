import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import MyButton from './MyButton';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRegion: {
                latitude: 50.111,
                longitude: 20.111,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            markers: [],
        }
    }

    render() {
        let markers_tab = []
        this.props.route.params.data.forEach(marker => {
            markers_tab.push(
                <MapView.Marker
                    coordinate={{
                        latitude: marker.locations.latitude,
                        longitude: marker.locations.longitude,
                    }}
                    title={"pos: " + marker.info.key}
                    description={`opis`}
                    key={marker.info.key}
                />
            )
        });
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 50.111,
                        longitude: 20.111,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                {markers_tab}
                </MapView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default Map;
