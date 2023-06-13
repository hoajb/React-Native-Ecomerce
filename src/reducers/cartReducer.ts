import { CartActionTypes, CartState, CartActions } from '../types/cartTypes';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.quantity,
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - getItemPrice(state.items, action.payload),
      };
    case CartActionTypes.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalPrice: calculateTotalPrice(state.items, action.payload),
      };
    case CartActionTypes.CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};

const getItemPrice = (items: CartState['items'], productId: string): number => {
  const item = items.find((item) => item.productId === productId);
  return item ? item.quantity : 0;
};

const calculateTotalPrice = (items: CartState['items'], payload: { productId: string; quantity: number }): number => {
  const updatedItem = items.find((item) => item.productId === payload.productId);
  const updatedItemPrice = updatedItem ? updatedItem.quantity * payload.quantity : 0;

  return items.reduce((total, item) => total + item.quantity, updatedItemPrice);
};