import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'

interface ProductCardProps {
    id: number
    handlePress: ((id: number) => void)
}
const ProductCard = ({ id, handlePress }: ProductCardProps) => {
    return <TouchableOpacity style={[styles.square]} onPress={() => { handlePress(id) }}>
        <View style={{ flex: 1 }}></View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    square: {
        flex: 1,
        margin: 10,
        aspectRatio: 0.5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
});

export default ProductCard