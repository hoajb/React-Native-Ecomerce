import React from 'react';
import { Platform } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = () => {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>MapScreen</Text>
            <Text style={styles.text}>Here's where you can view your MapScreen information.</Text> */}
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                mapType={Platform.OS == "android" ? "none" : "standard"}
                initialRegion={{
                    latitude: 10.76399195026082,
                    longitude: 106.69219642502206,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker
                    coordinate={{ latitude: 10.76399195026082, longitude: 106.69219642502206 }}
                    title="EPAM Office - MB Sunny Tower"
                    description="EPAM Office"
                    // image={{ uri: require('../../assets/logo_epam.png') }}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export { MapScreen };