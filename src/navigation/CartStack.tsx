import React from 'react';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { DrawerProps, CustomHeader2 } from './MainNavigator';
import { MyCartScreen, MapScreen } from '../screens';

export type RootCartStackParamList = {
    MyCartScreen: undefined;
    MapScreen: undefined;
};

export type MyCartScreenProps = StackScreenProps<RootCartStackParamList, "MyCartScreen">
export type MapScreenProps = StackScreenProps<RootCartStackParamList, "MapScreen">

const Stack = createStackNavigator<RootCartStackParamList>();

export function CartStack(drawer: DrawerProps) {
    return (
        <Stack.Navigator initialRouteName="MyCartScreen"
        >
            <Stack.Screen name="MyCartScreen" component={MyCartScreen}
                options={{
                    headerShown: true,
                    headerTitle: "MyCart",
                    headerLeft: () => CustomHeader2(drawer.navigation),
                }} />

            <Stack.Screen name="MapScreen" component={MapScreen}
                options={{ headerTitle: "Maps", }} />

        </Stack.Navigator>
    );
}
