import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Divider from '../common/Divider';
import GridFlatList from '../common/GridFlatList';
import SearchBox from '../common/SearchBox';
import ProductItemOri, { ProductItemOriProps } from '../components/ProductItemOri';
import { APIListProduct } from '../constants/dummy';
import { useState, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { HomeProps } from '../navigation/MainNavigator';

export default function HomeScreen({ navigation }: HomeProps) {
    const listMap: ProductItemOriProps[] = React.useMemo(() => {
        return APIListProduct.data.map((obj) => {
            const item = obj.attributes
            return {
                name: item.name,
                description: item.description,
                uri: `https://picsum.photos/200/300?random=${Math.random()}`,
                price: Math.floor(Number(item.price)), // return NaN
                origin_price: Math.floor(+item.price + 50) // return 0
            }
        })
    }, []);

    const [list, setList] = useState(listMap);
    const [isEmpty, setListEmpty] = useState(listMap.length == 0);
    useEffect(() => {
        setListEmpty(list.length == 0);
    }, [list]);

    return (
        <View style={styles.container}>
            <SearchBox onChangeText={(text: String) => {
                if (text.length == 0) { setList(listMap) }
                else {
                    const lowCaseText = text.trim().toLocaleLowerCase()
                    const listFiltered = listMap.filter((item) => item.name.toLocaleLowerCase().includes(lowCaseText))
                    setList(listFiltered);
                }
            }} />
            <Divider />
            {isEmpty && <View style={styles.container_empty}>
                <Text >No data found</Text>
            </View>}
            {!isEmpty && <GridFlatList
                data={list}
                renderItem={({ item, index }) =>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DetailsScreen', {
                                product: {
                                    id: item.id,
                                    name: index + '. ' + item.name,
                                    price: item.price,
                                    origin_price: item.origin_price,
                                    uri: item.uri,
                                    description: item.description,
                                }
                            })
                        }}
                    >
                        <ProductItemOri
                            id={item.id}
                            name={index + '. ' + item.name}
                            price={item.price}
                            origin_price={item.origin_price}
                            uri={item.uri}
                            description={item.description}
                        />
                    </TouchableOpacity>
                }
                keyExtractor={renderItem => renderItem.name}
                numColumns={2}
            />}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container_empty: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        backgroundColor: "white",
    },
    text: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: "bold",
        textAlign: "center",
    },

});
