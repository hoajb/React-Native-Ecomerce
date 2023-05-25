import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Item } from '../common/SearchBox';
import { theme } from '../theme/color';

interface MyComponentProps {
    listData: Item[];
    onRemoveItem: (itemId: number) => void;
    onSelectItem: (item: Item) => void;
}

const SearchHistoryComponent: React.FC<MyComponentProps> = ({
    listData,
    onRemoveItem,
    onSelectItem,
}) => {
    const removeItem = (itemId: number) => {
        onRemoveItem(itemId);
    };

    return (
        <View>
            {listData.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => { onSelectItem(item) }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        paddingVertical: 2,
                        backgroundColor: theme.colors.background
                    }}>
                        <Text style={{ flex: 1, flexWrap: 'wrap', color: 'gray' }}>{item.name}</Text>
                        <TouchableOpacity onPress={() => removeItem(item.id)} >
                            <FontAwesome name='remove' size={24} color={'gray'} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default SearchHistoryComponent;