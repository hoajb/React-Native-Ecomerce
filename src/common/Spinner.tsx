import React from 'react';
import { View, ActivityIndicator, StyleSheet, ActivityIndicatorProps } from 'react-native';

export interface SpinnerProps extends ActivityIndicatorProps {
}
const Spinner = (props: SpinnerProps) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={props.size || 'large'} color={'#2363c3'} />
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Spinner;
