import { Dispatch } from 'redux';
import {
    AuthActionTypes,
    User,
    LoginCredentials,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    AuthRegisterActions,
    AuthRegisterActionTypes,
} from '../types/authTypes';

// Action creators
export const login = async (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            // const credentials: LoginCredentials = { email, password }
            // Simulating an asynchronous API call
            // const response = await fetch('https://api.example.com/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(credentials),
            // });

            // if (response.ok) {
            //     const user: User = await response.json();
            //     dispatch(loginSuccess(user))
            // } else {
            //     const error = 'Invalid credentials';
            //     dispatch(loginFailure(error))
            // }

            if (email === 'email' && password === '123') {
                const user: User = { email: 'email@email.com', token: '123-token' };
                dispatch(loginSuccess(user))
            } else {
                dispatch(loginFailure('Wrong email pass'))
            }
        } catch (error) {
            dispatch(loginFailure('An error occurred'))
        }
    }

};

export const logout = () => {
    return (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch({
            type: LOGOUT,
        });
    };
};

export const loginSuccess = (user: User): AuthActionTypes => {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    };
};

export const loginFailure = (error: string): AuthActionTypes => {
    return {
        type: LOGIN_FAILURE,
        payload: error,
    };
};

export const registerUser = (user: LoginCredentials) => {
    return async (dispatch: Dispatch<AuthRegisterActions>) => {
        dispatch({ type: AuthRegisterActionTypes.REGISTER_REQUEST, payload: user });

        try {
            //CALL API register here
            // Perform the registration logic here, such as making an API request
            // Once the registration is successful, dispatch the REGISTER_SUCCESS action
            dispatch({ type: AuthRegisterActionTypes.REGISTER_SUCCESS });
        } catch (error: any) {
            // If an error occurs during registration, dispatch the REGISTER_FAILURE action
            dispatch({ type: AuthRegisterActionTypes.REGISTER_FAILURE, payload: error.message });
        }
    };
};
