import React, { Component, PropsWithChildren } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import Card from '../common/Card';

export interface ProductItemOriProps {
    id?: number,
    name: string,
    uri: string,
    price: Double,
    origin_price: Double,
    description: string,
    selected?: ((id: number) => void)
}

export default function ProductItemOri(props: ProductItemOriProps) {
    const id = props.id == null ? 100 : props.id * 10
    return (
        <View style={{ flex: 1 }}>
            <Card>
                <Image
                    style={styles.image}
                    source={{ uri: props.uri }} />
                <ProductTitleCard name={props.name} price={props.price} origin_price={props.origin_price} />

            </Card>
        </View>
    )
}

export interface ProductTitleCardProps {
    id?: number,
    name: string,
    price: Double,
    origin_price: Double,
}

export function ProductTitleCard(props: ProductTitleCardProps) {
    return <View><Text numberOfLines={1} style={[styles.text, { color: 'gray', paddingVertical: 10 }]}> {props.name} </Text>
        <View style={[styles.container, { flexDirection: 'row' }]}>
            <Text style={styles.text}> {'$' + props.price} </Text>
            <Text style={[styles.text, { textDecorationLine: "line-through", color: 'gray' }]}> {'$' + props.origin_price} </Text>
            <Text style={[styles.text, { color: 'blue' }]}> {Math.floor(100 - (props.price / props.origin_price) * 100) + '% Off'} </Text>
        </View></View>
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontWeight: 'bold'
    },
    image: {
        resizeMode: 'cover',
        aspectRatio: 2 / 3,
    },
});
