import Geolocation from 'react-native-geolocation-service';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Linking, PermissionsAndroid, Platform, Text, ToastAndroid } from 'react-native';
import { View, StyleSheet } from 'react-native';
import MapView, { LatLng, Marker, MarkerDragStartEndEvent, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { theme } from '../theme/color';
import appConfig from '../../app.json';

const EPAM_HCM_OFFICE: LatLng = {
    latitude: 10.767086,
    longitude: 106.693709,
}

const HCM_CITY: LatLng = {
    latitude: 10.8231,
    longitude: 106.6297,
}

const MapScreen = () => {
    const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null)
    const [loadingPositionState, setLoadingPositionState] = useState<Boolean>(true)

    const region: Region = {
        latitude: HCM_CITY.latitude,
        longitude: HCM_CITY.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const handleDragEnd = useCallback((e: MarkerDragStartEndEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setCurrentPosition({ latitude, longitude });
    }, []);

    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        }

        return false;
    };

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    React.useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ latitude, longitude });
                setLoadingPositionState(false)
                console.log(position);
            },
            error => {
                Alert.alert(`Code ${error.code}`, error.message);
                setCurrentPosition(null);
                setLoadingPositionState(false)
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: true,
                forceLocationManager: true,
                showLocationDialog: true,
            },
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                mapType={Platform.OS == "android" ? "none" : "standard"}
                initialRegion={region}>
                <Marker
                    coordinate={EPAM_HCM_OFFICE}
                    title="EPAM Office - MB Sunny Tower"
                    description="EPAM Office"
                // image={{ uri: require('../../assets/logo_epam.png') }}
                />
                {
                    (currentPosition &&
                        <Marker
                            draggable
                            onDragEnd={handleDragEnd}
                            coordinate={currentPosition}
                            title="Your Location"
                            description="Your order location"
                        />
                    )
                }
            </MapView>

            {
                (loadingPositionState &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color={theme.colors.danger} />
                )
            }
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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export { MapScreen };