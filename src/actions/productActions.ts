import { Dispatch } from 'redux';
import { ProductActionTypes, ProductActions } from '../types/productTypes';
import { Product } from '../data/Product';

export const fetchProductsRequest = (): ProductActions => {
    return {
        type: ProductActionTypes.FETCH_PRODUCTS_REQUEST,
    };
};

export const fetchProductsSuccess = (products: Product[]): ProductActions => {
    return {
        type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: products,
    };
};

export const fetchProductsFailure = (error: string): ProductActions => {
    return {
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        payload: error,
    };
};

export const fetchProducts = () => {
    return async (dispatch: Dispatch<ProductActions>) => {
        dispatch(fetchProductsRequest());

        try {
            // Simulating an API call to fetch products
            const response = await fetch('https://example.com/api/products');
            const data = await response.json();

            // Assuming the response is an array of products
            dispatch(fetchProductsSuccess(data));
        } catch (error: any) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};