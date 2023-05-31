import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type Props = {
    navigation: any;
    route: any
}

const ProductCatalogueScreen = ({ navigation, route }: Props) => {
    const { id, step } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Catalogue Screen with Id {id} and Deep {step}</Text>
            <Button title='Go to Product Catalogue inside' onPress={() => {
                navigation.push('ProductCatalogueScreen', { id: id, step: step + 1 });
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

export { ProductCatalogueScreen };