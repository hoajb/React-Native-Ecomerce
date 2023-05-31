import React, { useReducer, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary, launchCamera, CameraOptions, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker'

import { ProfileScreenProps } from '../navigation/MainNavigator';
import ModalController from '../common/dialog/ModalController';
import { theme } from '../theme/color';
import MyButton from '../common/Button';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

interface State {
    name: string;
    mobile: string;
    city: string;
    street: string;
    building: string;
    isButtonUpdateDisabled: boolean;
}

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_MOBILE_NUMBER'; payload: string }
    | { type: 'SET_CITY'; payload: string }
    | { type: 'SET_STREET'; payload: string }
    | { type: 'SET_BUILDING'; payload: string }
    | { type: 'RESET' };

const initialState: State = {
    name: '',
    mobile: '',
    city: '',
    street: '',
    building: '',
    isButtonUpdateDisabled: true
};

function reducer(state: State, action: Action): State {
    let isButtonUpdateDisabled: boolean
    switch (action.type) {
        case 'SET_NAME':
            isButtonUpdateDisabled = action.payload.trim() === '' || state.mobile.trim() === ''
                || state.city.trim() === '' || state.street.trim() === '' || state.building.trim() === ''
            return { ...state, isButtonUpdateDisabled, name: action.payload };
        case 'SET_MOBILE_NUMBER':
            isButtonUpdateDisabled = state.name.trim() === '' || action.payload.trim() === ''
                || state.city.trim() === '' || state.street.trim() === '' || state.building.trim() === ''
            return { ...state, isButtonUpdateDisabled, mobile: action.payload };
        case 'SET_CITY':
            isButtonUpdateDisabled = state.name.trim() === '' || state.mobile.trim() === ''
                || action.payload.trim() === '' || state.street.trim() === '' || state.building.trim() === ''
            return { ...state, isButtonUpdateDisabled, city: action.payload };
        case 'SET_STREET':
            isButtonUpdateDisabled = state.name.trim() === '' || state.mobile.trim() === ''
                || state.city.trim() === '' || action.payload.trim() === '' || state.building.trim() === ''
            return { ...state, isButtonUpdateDisabled, street: action.payload };
        case 'SET_BUILDING':
            isButtonUpdateDisabled = state.name.trim() === '' || state.mobile.trim() === ''
                || state.city.trim() === '' || state.street.trim() === '' || action.payload.trim() === ''
            return { ...state, isButtonUpdateDisabled, building: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;

    }

};

const actions = {
    camera: {
        title: 'Take Image',
        type: 'capture',
        options: {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
            cameraType: 'front'
        } as CameraOptions,
    },
    gallery: {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        } as ImageLibraryOptions,
    },
}

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
    const { name: welcomeName } = route.params
    const [state, dispatch] = useReducer(reducer, initialState)

    const [assetAvatar, setAssetAvatar] = useState('')

    const handleTextChange = (inputText: string, field: Action['type']): void => {
        dispatch({ type: field, payload: inputText });
    };

    // Avatar
    const [response, setResponse] = React.useState<ImagePickerResponse>();
    let STORAGE_KEY = '@user_input';
    React.useEffect(() => {
        (async () => {
            if (response?.assets) {
                try {
                    const selectedAvatar = response?.assets[0].uri
                    console.log(selectedAvatar)
                    if (selectedAvatar) {
                        await AsyncStorage.setItem(STORAGE_KEY, selectedAvatar)
                        setAssetAvatar(selectedAvatar)
                        console.log('Data successfully saved')
                    }
                } catch (e) {
                    console.log('Failed to save the data to the storage')
                }
            }
        })()

    }, [response])

    React.useEffect(() => {
        (async () => {
            try {
                const lastAvatar = await AsyncStorage.getItem(STORAGE_KEY)
                if (lastAvatar)
                    setAssetAvatar(lastAvatar)
                console.log('Data successfully restored')
            } catch (e) {
                console.log('Failed to restore the data from the storage')
            }
        })()
    }, [])

    return (
        <View style={styles.container}>

            <Text style={[styles.text, { margin: 20 }]}>Welcome {welcomeName}</Text>
            {/* <DemoResponse>{response}</DemoResponse> //for debug*/}

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => handleTextChange(text, 'SET_NAME')}
                value={state.name}
                inputMode='text'
                placeholder="Full Name"
            />

            <TouchableOpacity style={styles.avatarBg}
                onPress={() => {
                    ModalController.showImageCameraGalleryModal(
                        {
                            message: 'Change Avatar2?',
                            onCamera: () => {
                                console.log('onCamera')
                                launchCamera(actions.camera.options, setResponse);
                            },
                            onGallery: () => {
                                console.log('onGallery')
                                launchImageLibrary(actions.gallery.options, setResponse)
                            }
                        }
                    )
                }}>
                {assetAvatar == '' &&
                    <FontAwesome name={'camera'} size={40} color={'white'} />}
                {assetAvatar !== '' &&
                    <View key={assetAvatar} style={styles.avatarProfile}>
                        <Image
                            resizeMode="cover"
                            resizeMethod="auto"
                            style={styles.imageAvatar}
                            source={{ uri: assetAvatar }}
                        />
                    </View>
                }
            </TouchableOpacity>

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => handleTextChange(text, 'SET_MOBILE_NUMBER')}
                value={state.mobile}
                inputMode='tel'
                placeholder="Mobile Number"
            />

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => handleTextChange(text, 'SET_CITY')}
                value={state.city}
                inputMode='text'
                placeholder="City"
            />

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => handleTextChange(text, 'SET_STREET')}
                value={state.street}
                inputMode='text'
                placeholder="Locality, area or street"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => handleTextChange(text, 'SET_BUILDING')}
                value={state.building}
                inputMode='text'
                placeholder="Flat no, Building name"
            />

            <MyButton disabled={state.isButtonUpdateDisabled} text={'Update'} onPress={() => {


            }} />

            <MyButton text={'Logout'} onPress={() => {
                ModalController.showLogoutModal()
            }} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    textInput: {
        height: 40,
        paddingHorizontal: 10,
        width: "80%",
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10
    },
    avatarBg: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 50,
        margin: 10,
    },
    avatarProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    buttonContainer: {
        flex: 1,
        marginVertical: 8,
    },
    imageAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export { ProfileScreen };