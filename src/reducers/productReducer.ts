import { ProductActionTypes, ProductState, ProductActions } from '../types/productTypes';

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const productReducer = (state = initialState, action: ProductActions): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};