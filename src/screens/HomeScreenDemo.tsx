import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import CircleCategory from "../components/CircleCategory";
import ProductCard from "../components/ProductCard";
import { RootStackParamList } from "../navigation/HomeStack";
import { StackScreenProps } from "@react-navigation/stack";

type HomeScreenProps = StackScreenProps<RootStackParamList, "HomeScreenDemo">;

const HomeScreenDemo = ({ navigation }: HomeScreenProps) => {

    const goToProfile = () => {
        // navigation.navigate('ProfileScreen', { name: "Jane" });
    };

    const goToSearch = () => {
        navigation.navigate('SearchScreen');
    };

    const goToProductCatalogue = (id: number, step: number) => {
        navigation.navigate('ProductCatalogueScreen', { id: id, step: step });
    };

    const goToProductCard = (id: number, step: number) => {
        navigation.navigate('ProductCardScreen', { id: id, step: step });
    };

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Go to Search Screen"
                        onPress={goToSearch}
                    />
                </View>
            </View>

            <View style={styles.menu_container}>
                <CircleCategory handlePress={(id: number) => {
                    goToProductCatalogue(id, 0);
                }} id={0} />

                <CircleCategory handlePress={(id: number) => {
                    goToProductCatalogue(id, 0);
                }} id={10} />


                <CircleCategory handlePress={(id: number) => {
                    goToProductCatalogue(id, 0);
                }} id={20} />

            </View>

            <Text style={styles.title}> Product Catalogue</Text>

            <View style={styles.menu_container}>
                <ProductCard handlePress={(id: number) => {
                    goToProductCard(id, 0);
                }} id={0} />

                <ProductCard handlePress={(id: number) => {
                    goToProductCard(id, 0);
                }} id={10} />


                <ProductCard handlePress={(id: number) => {
                    goToProductCard(id, 0);
                }} id={20} />

            </View>
            <Text style={styles.title}> Product Catalogue</Text>



            <Button title="Go to Profile Screen" onPress={goToProfile} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: 'blue',
        marginBottom: 20,
    },
    button: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 0,
        margin: 10
    },

    menu_container: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 10
    },

});

export { HomeScreenDemo };
