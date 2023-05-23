import * as React from 'react';

import { View, StyleSheet, FlatList, FlatListProps, ListRenderItem } from 'react-native';

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

interface ExtraProps<ItemT> {
    data: ArrayLike<ItemT> | null | undefined;
    renderItem: ListRenderItem<ItemT> | null | undefined;
    numColumns?: number;
    gap?: number;
    paddingHorizontal?: number;
    paddingTop?: number;
    showsVerticalScrollIndicator?: boolean;
    keyExtractor?: (item: any, index: number) => string;
}

interface GridFlatListInterface<ItemT>
    extends SimpleSpread<FlatListProps<ItemT>, ExtraProps<ItemT>> { }

const randomKeyExtractor = (item: any, index: number): string => {
    return item.id ? item.id : 'grid-flat-list-item_' + index + Math.random();
};

export default function GridFlatList<ItemT>({
    data,
    renderItem,
    numColumns = 2,
    gap = 0,
    paddingHorizontal = 0,
    paddingTop = 0,
    showsVerticalScrollIndicator = false,
    keyExtractor = randomKeyExtractor,
    ...props
}: GridFlatListInterface<ItemT>) {
    const firstRowElementStyle = (index: number) => {
        if (index < numColumns) {
            return {
                paddingTop,
            };
        }

        return null;
    };

    const lastRowChildStyle = (index: number) => {
        if ((index + 1) % numColumns === 0) {
            return { paddingRight: paddingHorizontal, paddingLeft: 0 };
        }
        return null;
    };

    const lastOddChildStyle = (index: number) => {
        if (data == null) return null;
        if (index + 1 === data.length && (index + 1) % 2 !== 0) {
            return {
                paddingRight: gap + paddingHorizontal,
            };
        }

        return null;
    };

    return (
        <FlatList
            columnWrapperStyle={styles.row}
            data={data}
            numColumns={numColumns}
            renderItem={(listRenderItem) => {
                if (renderItem == null) return <View />
                return (
                    <View
                        style={[
                            {
                                flex: 1 / numColumns,
                                paddingLeft: paddingHorizontal,
                                paddingBottom: gap,
                                paddingRight: gap,
                            },
                            firstRowElementStyle(listRenderItem.index),
                            lastRowChildStyle(listRenderItem.index),
                            lastOddChildStyle(listRenderItem.index),
                        ]}
                    >
                        {renderItem(listRenderItem)}
                    </View>
                )
            }}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            keyExtractor={keyExtractor}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});