import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme/color';

export interface BaseProps {
    text: string,
    disabled?: boolean,
    onPress?: (() => void) | undefined;
}

const MyButton = ({ text, onPress, disabled }: BaseProps) => {
    return (
        <TouchableOpacity
            disabled={disabled ? disabled : false}
            style={[styles.submit,
            { backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary, }]}
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
        borderRadius: 10,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }
});
