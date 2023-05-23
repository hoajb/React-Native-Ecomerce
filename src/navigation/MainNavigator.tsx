import React from 'react';
import {  StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp, DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductCatalogueScreen from '../screens/ProductCatalogueScreen';
import ProductCardScreen from '../screens/ProductCardScreen';
import MyWishListScreen from '../screens/MyWishListScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export type RootStackParamList = {
    HomeScreen: undefined;
    SearchScreen: undefined;
    ProductCatalogueScreen: { id: number, step: number };
    ProductCardScreen: { id: number, step: number };
};

export type RootDrawerParamList = {
    HomeStack: undefined;
    ProfileScreen: { name: string };
    MyWishListScreen: undefined;
};

type DrawerProps = DrawerScreenProps<RootDrawerParamList>;
export type ProfileScreenProps = DrawerScreenProps<RootDrawerParamList, "ProfileScreen">;
export type MyWishListScreenProps = DrawerScreenProps<RootDrawerParamList, "MyWishListScreen">;

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function CustomHeader2(navigation: DrawerNavigationProp<RootDrawerParamList>) {
    return (
        <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
    );
}

function HomeStack(drawer: DrawerProps) {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" >
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

        </Stack.Navigator>
    );
}

const MainNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeStack">
            <Drawer.Screen name="HomeStack"
                component={HomeStack}
                options={{
                    headerShown: false,
                    headerTitle: "Home",
                }} />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen}
                options={(drawer: DrawerProps) => (
                    {
                        headerShown: true,
                        headerTitle: "Profile",
                        headerLeft: () => (CustomHeader2(drawer.navigation))
                    }
                )}
                initialParams={{ name: "Jane init" }} />
            <Drawer.Screen name="MyWishListScreen"
                component={MyWishListScreen}
                options={(drawer: DrawerProps) => (
                    {
                        headerShown: true,
                        headerTitle: "MyWishList",
                        headerLeft: () => (CustomHeader2(drawer.navigation))
                    }
                )} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        padding: 10,
    },
    hamburger: {
        width: 20,
        height: 20,
    },
});


export default MainNavigator;
