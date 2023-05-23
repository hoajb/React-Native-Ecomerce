import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export interface SearchBoxProps {
    onChangeText: (text: String) => void
}


const SearchBox = (props: SearchBoxProps) => {
    const [text, setText] = useState('')
    const handleChangeText = (text: string) => {
        setText(text);
        props.onChangeText(text);
    };
    return (
        <View>
            <TextInput
                value={text}
                style={{ fontSize: 16, color: 'steelblue' }}
                placeholder="Type here..."
                // onChangeText={(text) => {
                //     props.onChangeText(text)
                //     setText(text)
                // }} 

                onChangeText={handleChangeText}
            />
            <Text style={{ fontSize: 16 }}>
                {'\n'}You entered: {text}
            </Text>
        </View>
    );
}

export default SearchBox;

const styles = StyleSheet.create({

});
