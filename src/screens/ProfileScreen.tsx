import { StackNavigationProp } from '@react-navigation/stack';
import React, { useReducer } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ProfileScreenProps } from '../navigation/MainNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalController from '../common/dialog/ModalController';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../theme/color';
import MyButton from '../common/Button';

interface State {
    name: string;
    mobile: string;
    city: string;
    street: string;
    building: string;
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
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_MOBILE_NUMBER':
            return { ...state, email: action.payload };
        case 'SET_CITY':
            return { ...state, password: action.payload };
        case 'SET_STREET':
            return { ...state, password: action.payload };
        case 'SET_BUILDING':
            return { ...state, password: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
    const { name: welcomeName } = route.params
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleTextChange = (inputText: string, field: Action['type']): void => {
        dispatch({ type: field, payload: inputText });
    };
    return (
        <View style={styles.container}>

            {/* <TouchableOpacity onPress={() => {
                ModalController.showModal({
                    message: "Welcome to the Profile Screen",
                    positiveButton: 'Logout',
                    positiveButtonPressed: (ref) => {
                        console.log(ref)
                        console.log('positiveButtonPressed')
                    },
                    negativeButton: 'No',
                    negativeButtonPressed: (ref) => {
                        console.log(ref)
                        console.log('negativeButtonPressed')
                    },
                    icon: 'check-circle'
                })
            }}>
                <Text style={styles.title}>Profile Screen</Text>
            </TouchableOpacity> */}

            <Text style={[styles.text, { margin: 20 }]}>Welcome {welcomeName}</Text>

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => handleTextChange(text, 'SET_NAME')}
                value={state.name}
                inputMode='text'
                placeholder="Full Name"
            />

            <TouchableOpacity style={styles.avatarProfile}
                onPress={() => { }}>
                <FontAwesome name={'camera'} size={40} color={'white'} />
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

            <MyButton text={'Update'} onPress={() => { }} />

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
    avatarProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 50,
        margin: 10,
    }

});

export default ProfileScreen;