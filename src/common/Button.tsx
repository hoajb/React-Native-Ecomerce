import * as React from 'react';
import { StyleSheet, Text, TouchableHighlight, GestureResponderEvent, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../theme/color';

export interface BaseProps {
    text: string,
    onPress?: (() => void) | undefined;
}

const MyButton = ({ text, onPress }: BaseProps) => {
    return (
        <TouchableOpacity
            style={styles.submit}
            onPress={onPress}>
            <Text style={[styles.submitText]}>{text}</Text>
        </TouchableOpacity>
    );
}

export default MyButton;

const styles = StyleSheet.create({
    submit: {
        width: 100,
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        padding: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }
});
