import React from 'react';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { DrawerProps, CustomHeader2 } from './MainNavigator';
import {
    HomeScreen,
    DetailsScreen,
    HomeScreenDemo,
    ProductCardScreen,
    ProductCatalogueScreen,
    SearchScreen,
} from '../screens'
import { Product } from '../data/Product';

export type RootStackParamList = {
    HomeScreenDemo: undefined;
    SearchScreen: undefined;
    ProductCatalogueScreen: { id: number, step: number };
    ProductCardScreen: { id: number, step: number };
    HomeScreen: { title: String }
    DetailsScreen: { product: Product }
};

export type HomeProps = StackScreenProps<RootStackParamList, "HomeScreen">
export type DetailsProps = StackScreenProps<RootStackParamList, "DetailsScreen">

export const Stack = createStackNavigator<RootStackParamList>();

export function HomeStack(drawer: DrawerProps) {
    return (
        <Stack.Navigator initialRouteName="HomeScreen"
        >
            <Stack.Screen name="HomeScreenDemo" component={HomeScreenDemo}
                options={{
                    headerShown: true,
                    headerTitle: "Home",
                    headerLeft: () => CustomHeader2(drawer.navigation),
                }} />

            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Home",
                    headerLeft: () => CustomHeader2(drawer.navigation),
                }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen}
                options={{ headerTitle: "Search", }} />
            <Stack.Screen name="ProductCatalogueScreen" component={ProductCatalogueScreen}
                options={{
                    headerTitle: "ProductCatalogue",
                }} />
            <Stack.Screen name="ProductCardScreen" component={ProductCardScreen}
                options={{ headerTitle: "ProductCard", }} />

            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{ headerTitle: "DetailsScreen", }} />

        </Stack.Navigator>
    );
}
