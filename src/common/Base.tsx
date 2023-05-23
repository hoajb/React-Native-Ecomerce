import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface BaseProps {
}

const Base = (props: BaseProps) => {
    return (
        <View>
            <Text>App Component</Text>
        </View>
    );
}

export default Base;

const styles = StyleSheet.create({
    
});
