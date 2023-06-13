import { Product } from "../data/Product";
  export interface ProductState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
  }
  
  export enum ProductActionTypes {
    FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
    FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
  }
  
  interface FetchProductsRequestAction {
    type: ProductActionTypes.FETCH_PRODUCTS_REQUEST;
  }
  
  interface FetchProductsSuccessAction {
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
    payload: Product[];
  }
  
  interface FetchProductsFailureAction {
    type: ProductActionTypes.FETCH_PRODUCTS_FAILURE;
    payload: string;
  }
  
  export type ProductActions =
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction;