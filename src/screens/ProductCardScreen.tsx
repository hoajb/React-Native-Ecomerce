import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type Props = {
    navigation: any;
    route: any
}

const ProductCardScreen = ({ navigation, route }: Props) => {
    const { id, step } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Card Screen with Id {id} {'\n'} Deep {step}</Text>
            <Button title='Go to Product Card inside' onPress={() => {
                navigation.push('ProductCardScreen', { id: id, step: step + 1 });
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
        textAlign: 'center'
    },

});

export default ProductCardScreen;