import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { DetailsProps } from '../navigation/MainNavigator';
import Swiper from 'react-native-swiper';
import { Dimensions } from 'react-native';
import { ProductTitleCard } from '../components/ProductItemOri';
import Divider from '../common/Divider';
import SelectionCard from '../components/SelectionCard';
import { ScrollView } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const DetailsScreen = ({ route }: DetailsProps) => {
    const { product } = route.params
    console.log(product)

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                    <ImageSwiper
                        images={[
                            'https://picsum.photos/200/300',
                            'https://picsum.photos/200/300',
                            'https://picsum.photos/200/300',
                            'https://picsum.photos/200/300',
                        ]} />

                    <ProductTitleCard name={product.name} price={product.price} origin_price={product.origin_price} />
                    <Divider />
                    <Text style={styles.textTitle}>Select color</Text>
                    <SelectionCard stringList={['Red', 'Blue', 'Green']} />
                    <Divider />
                    <Text style={styles.textTitle}>Description</Text>
                    <Text style={styles.textContent}>{product.description}\n{product.description}\n{product.description}</Text>
                </View>
            </ScrollView>

            <View style={{ backgroundColor: 'blue', borderRadius: 5, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Text style={{ color: 'white', textTransform: 'capitalize' }}>Add To Card</Text>
            </View>
        </View>
    )
}

interface ImageSwiperProps {
    images: string[];
}

const ImageSwiper = ({ images }: ImageSwiperProps) => {

    return (
        <View style={[styles.swipeContainer]}>
            <Swiper showsButtons loop={true}>
                {images.map((url, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: url }} style={styles.image} />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },

    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },

    textContent: {
        fontSize: 14,
    },

    swipeContainer: {
        height: SCREEN_HEIGHT * 3 / 7,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    image: {
        marginBottom: 50,
        aspectRatio: 3 / 2,
        borderRadius: 0,
        resizeMode: 'contain'
    },

});

export default DetailsScreen
