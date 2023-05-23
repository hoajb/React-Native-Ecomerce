import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyWishListScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MyWishListScreen</Text>
            <Text style={styles.text}>Here's where you can view your MyWishListScreen information.</Text>
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

export default MyWishListScreen;