import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProfileScreenProps, RootDrawerParamList, RootStackParamList } from '../navigation/MainNavigator';
import { RouteProp } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';

// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
// type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

// interface ProfileScreenProps {
//     navigation: ProfileScreenNavigationProp,
//     route: ProfileScreenRouteProp
// }


const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
    const { name } = route.params
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Text style={styles.text}>Welcome {name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default ProfileScreen;