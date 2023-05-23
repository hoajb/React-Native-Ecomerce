import * as React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, GestureResponderEvent } from 'react-native';

export interface BaseProps {
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Button = (props: BaseProps) => {
    return (
        <TouchableHighlight
            style={styles.submit}
            onPress={props.onPress}
            underlayColor='#fff'>
            <Text style={[styles.submitText]}>Submit</Text>
        </TouchableHighlight>
    );
}

export default Button;

const styles = StyleSheet.create({
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }
});
