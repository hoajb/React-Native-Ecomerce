export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  }
  
  export enum CartActionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    UPDATE_QUANTITY = 'UPDATE_QUANTITY',
    CLEAR_CART = 'CLEAR_CART',
  }
  
  interface AddToCartAction {
    type: CartActionTypes.ADD_TO_CART;
    payload: CartItem;
  }
  
  interface RemoveFromCartAction {
    type: CartActionTypes.REMOVE_FROM_CART;
    payload: string; // productId
  }
  
  interface UpdateQuantityAction {
    type: CartActionTypes.UPDATE_QUANTITY;
    payload: {
      productId: string;
      quantity: number;
    };
  }
  
  interface ClearCartAction {
    type: CartActionTypes.CLEAR_CART;
  }
  
  export type CartActions = AddToCartAction | RemoveFromCartAction | UpdateQuantityAction | ClearCartAction;