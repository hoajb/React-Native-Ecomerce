
import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SelectionCardProps {
    stringList: string[]
}
const _colors = {
    active: `#f1f1f1`,
    inactive: `#FCD25900`,
};

const SelectionCard = ({ stringList }: SelectionCardProps) => {
    const [indexSelected, setIndexSelected] = React.useState(0)

    const data = React.useMemo(() => {
        return stringList.map((value, index) => ({
            id: index,
            title: `${value}`,
        }));

    }, [stringList])
    return (
        <View style={styles.container}>
            <FlatList
                style={{ flexGrow: 0 }}
                data={data}
                keyExtractor={(item, index) => `${item.id}${index}`}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item, index: fIndex }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setIndexSelected(fIndex)
                            }}>
                            <View
                                style={[styles.boxContainer, {
                                    backgroundColor: indexSelected == fIndex ? _colors.active : _colors.inactive,
                                }]}>
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}>
            </FlatList >

        </View >
    );
};

export default SelectionCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },

    boxContainer: {
        backgroundColor: '#f1f1f1',
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: _colors.active,

    }
});
