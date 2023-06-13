import React from 'react';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { DrawerProps, CustomHeader2 } from './MainNavigator';
import {
    LoginScreen,
    RegisterScreen,
} from '../screens'

export type RootStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
};

export type LoginProps = StackScreenProps<RootStackParamList, "LoginScreen">
export type RegisterProps = StackScreenProps<RootStackParamList, "RegisterScreen">

export const Stack = createStackNavigator<RootStackParamList>();

export function AuthStack(drawer: DrawerProps) {
    return (
        <Stack.Navigator initialRouteName="LoginScreen"
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Login",
                    headerLeft: () => CustomHeader2(drawer.navigation),
                }} />

            <Stack.Screen name="RegisterScreen" component={RegisterScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Register",
                    headerLeft: () => CustomHeader2(drawer.navigation),
                }} />

        </Stack.Navigator>
    );
}
