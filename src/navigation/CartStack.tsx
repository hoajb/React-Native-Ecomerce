import React from 'react';
import { StackScreenProps, createStackNavigator } from '@react-navigation/Stack';
import { DrawerProps, CustomHeader2 } from './MainNavigator';
import MyCartScreen from '../screens/MyCartScreen';

export type RootCartStackParamList = {
    MyCartScreen: undefined;
    MapScreen: undefined;
};

export type MyCartScreenProps = StackScreenProps<RootCartStackParamList, "MyCartScreen">
export type MapScreenProps = StackScreenProps<RootCartStackParamList, "MapScreen">

export const CartStack = createStackNavigator<RootCartStackParamList>();

export function CartCartStack(drawer: DrawerProps) {
    return (
        <CartStack.Navigator initialRouteName="MyCartScreen"
        >
            <CartStack.Screen name="MyCartScreen" component={MyCartScreen}
                options={{
                    headerShown: true,
                    headerTitle: "MyCartScreen",
                    headerLeft: () => CustomHeader2(drawer.navigation),
                }} />

            <CartStack.Screen name="MapScreen" component={MapScreen}
                options={{
                    headerShown: true,
                    headerTitle: "MapScreen",
                    headerLeft: () => CustomHeader2(drawer.navigation),
                }} />




        </CartStack.Navigator>
    );
}
