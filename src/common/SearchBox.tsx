import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import SearchHistoryComponent from '../components/HistorySearchComponent';
import AsyncStorage from '@react-native-community/async-storage';
import { theme } from '../theme/color';

export interface SearchBoxProps {
    onChangeText: (text: String) => void
}

export interface Item {
    id: number;
    name: string;
}

const SearchBox = (props: SearchBoxProps) => {
    const [text, setText] = useState('')
    const handleChangeText = (text: string) => {
        setText(text);
        setInputValue(text)
    };

    const [inputValue, setInputValue] = useState('');
    const [listData, setListData] = useState<Item[]>([]);

    useEffect(() => {
        // Load data from AsyncStorage on component mount
        loadData();
    }, []);

    useEffect(() => {
        saveData(); // Save data whenever it changes
    }, [listData]);

    const loadData = async () => {
        try {
            const data = await AsyncStorage.getItem('listData');
            if (data) {
                setListData(JSON.parse(data));
            }
        } catch (error) {
            console.log('Error loading data:', error);
        }
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('listData', JSON.stringify(listData));
            // console.log('Data saved successfully');
        } catch (error) {
            console.log('Error saving data:', error);
        }
    };

    const addItem = () => {
        if (inputValue === '') return
        const doesExist = listData.some(item => item.name.includes(inputValue));
        if (!doesExist) {
            const newItem: Item = { id: Date.now(), name: inputValue };
            setListData([newItem, ...listData]);
        }
    };

    const removeItem = (itemId: number) => {
        const updatedList = listData.filter((item) => item.id !== itemId);
        setListData(updatedList);
    };
    function onSelectItem(item: Item): void {
        handleChangeText(item.name)
        // console.log(`onSelectItem - ${item.name}`)
        props.onChangeText(item.name)
    }

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                backgroundColor: theme.colors.background,
                alignItems: 'center'
            }}>
                <TextInput
                    value={text}
                    style={{ marginHorizontal: 10, fontSize: 16, color: 'steelblue', flex: 1 }}
                    placeholder="Search Product..."
                    onChangeText={handleChangeText}
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: theme.colors.secondary,
                        borderRadius: 5, padding: 5, margin: 5
                    }}
                    onPress={() => {
                        props.onChangeText(text);
                        addItem()
                    }} >
                    <Text style={{ color: 'white' }}>Search</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 0.5, backgroundColor: '#c1c1c1' }} />
            <SearchHistoryComponent
                listData={listData}
                onRemoveItem={removeItem}
                onSelectItem={onSelectItem} />
        </View>
    );
}

export default SearchBox;

const styles = StyleSheet.create({

});
