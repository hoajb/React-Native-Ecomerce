import { CartActionTypes, CartItem, CartActions } from '../types/cartTypes';

export const addToCart = (item: CartItem): CartActions => {
    return {
        type: CartActionTypes.ADD_TO_CART,
        payload: item,
    };
};

export const removeFromCart = (productId: string): CartActions => {
    return {
        type: CartActionTypes.REMOVE_FROM_CART,
        payload: productId,
    };
};

export const updateQuantity = (productId: string, quantity: number): CartActions => {
    return {
        type: CartActionTypes.UPDATE_QUANTITY,
        payload: {
            productId,
            quantity,
        },
    };
};

export const clearCart = (): CartActions => {
    return {
        type: CartActionTypes.CLEAR_CART,
    };
};