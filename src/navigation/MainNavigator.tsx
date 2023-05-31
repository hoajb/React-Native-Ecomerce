import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerNavigationProp, DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';
import MyCartScreen from '../screens/MyCartScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomDrawerContent from './CustomDrawerContent';
import {
    DemoSelectionScreen,
    MyWishListScreen,
    ProfileScreen,
    ShareScreen,
} from '../screens';
import { HomeStack } from './HomeStack';


export type ProfileScreenProps = DrawerScreenProps<RootDrawerParamList, "ProfileScreen">;
export type MyWishListScreenProps = DrawerScreenProps<RootDrawerParamList, "MyWishListScreen">;
export type ShareScreenProps = DrawerScreenProps<RootDrawerParamList, "ShareScreen">;

export type RootDrawerParamList = {
    HomeStack: undefined;
    ProfileScreen: { name: string };
    MyWishListScreen: undefined;
    ShareScreen: undefined;
    DemoSelectionScreen: undefined;
    MyCartScreen: undefined;
};

export type DrawerProps = DrawerScreenProps<RootDrawerParamList>;
const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function CustomHeader2(navigation: DrawerNavigationProp<RootDrawerParamList>) {
    return (
        <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
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
                initialParams={{ name: "Hoa Nguyen" }} />
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
            <Drawer.Screen name="DemoSelectionScreen"
                component={DemoSelectionScreen}
                options={(drawer: DrawerProps) => (
                    {
                        headerShown: true,
                        headerTitle: "DemoSelectionScreen",
                        headerLeft: () => (CustomHeader2(drawer.navigation))
                    }
                )} />

            <Drawer.Screen name="MyCartScreen"
                component={MyCartScreen}
                options={(drawer: DrawerProps) => (
                    {
                        headerShown: true,
                        headerTitle: "MyCart",
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
