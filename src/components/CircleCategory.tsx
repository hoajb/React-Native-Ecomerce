import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'

interface CircleProps {
    id: number
    handlePress: ((id: number) => void)
}
const CircleCategory = ({ id, handlePress }: CircleProps) => {
    return <TouchableOpacity style={[styles.circle]} onPress={() => { handlePress(id) }}>
        <View style={{ flex: 1 }}></View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        margin: 10,
        aspectRatio: 1,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default CircleCategory