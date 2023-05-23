import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp, DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreenDemo from '../screens/HomeScreenDemo';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductCatalogueScreen from '../screens/ProductCatalogueScreen';
import ProductCardScreen from '../screens/ProductCardScreen';
import MyWishListScreen from '../screens/MyWishListScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Product } from '../data/Product';
import HomeScreen from '../screens/HomeScreen';
import ShareScreen from '../screens/ShareScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CustomDrawerContent from './CustomDrawerContent';


export type RootStackParamList = {
    HomeScreenDemo: undefined;
    SearchScreen: undefined;
    ProductCatalogueScreen: { id: number, step: number };
    ProductCardScreen: { id: number, step: number };
    HomeScreen: { title: String }
    DetailsScreen: { product: Product }
};

export type ProfileScreenProps = DrawerScreenProps<RootDrawerParamList, "ProfileScreen">;
export type MyWishListScreenProps = DrawerScreenProps<RootDrawerParamList, "MyWishListScreen">;
export type ShareScreenProps = DrawerScreenProps<RootDrawerParamList, "ShareScreen">;

export type HomeProps = StackScreenProps<RootStackParamList, "HomeScreen">
export type DetailsProps = StackScreenProps<RootStackParamList, "DetailsScreen">

export type RootDrawerParamList = {
    HomeStack: undefined;
    ProfileScreen: { name: string };
    MyWishListScreen: undefined;
    ShareScreen: undefined;
};

export type DrawerProps = DrawerScreenProps<RootDrawerParamList>;

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
        <Stack.Navigator initialRouteName="HomeScreen"
        // screenOptions={{
        //     headerStyle: {
        //         backgroundColor: theme.colors.primary, // Set your desired background color here
        //     },
        //     headerTintColor: 'white', // Set the text color of the header buttons
        //     headerTitleStyle: {
        //         fontWeight: 'bold', // Set the font weight of the header title
        //     },
        // }}
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
                options={{ headerTitle: "DetailsScreen", }}
            />

        </Stack.Navigator>
    );
}


const MainNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeStack"
            drawerContent={(props) => CustomDrawerContent(props)}
        >
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
            <Drawer.Screen name="ShareScreen"
                component={ShareScreen}
                options={(drawer: DrawerProps) => (
                    {
                        headerShown: true,
                        headerTitle: "ShareScreen",
                        headerLeft: () => (CustomHeader2(drawer.navigation))
                    }
                )} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
    },
    hamburger: {
        width: 20,
        height: 20,
    },
});


export default MainNavigator;
