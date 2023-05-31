import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from '../common/Button';
import { MyCartScreenProps } from '../navigation/CartStack';

const MyCartScreen = ({ navigation }: MyCartScreenProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MyCartScreen</Text>
            <Text style={styles.text}>Here's where you can view your MyCartScreen information.</Text>
            <MyButton text={'View My Map'} onPress={() => {
                navigation.navigate('MapScreen')
            }} />
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

export { MyCartScreen };