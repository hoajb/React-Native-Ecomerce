import { Action, AnyAction } from 'redux';
// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOGOUT = 'LOGOUT';

// User type
export interface User {
    email: string;
    token: string;
    // Other user properties
}

// Login credentials type
export interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
}

// Action interfaces
interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: User;
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string; // Error message
}

interface LogoutAction {
    type: typeof LOGOUT;
}

interface ClearAction {
    type: typeof CLEAR_ERROR;
}

export enum AuthRegisterActionTypes {
    REGISTER_REQUEST = 'REGISTER_REQUEST',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILURE = 'REGISTER_FAILURE',
}

export interface RegisterUserRequestAction {
    type: AuthRegisterActionTypes.REGISTER_REQUEST;
    payload: LoginCredentials
}

export interface RegisterUserSuccessAction {
    type: AuthRegisterActionTypes.REGISTER_SUCCESS;
}

export interface RegisterUserFailureAction {
    type: AuthRegisterActionTypes.REGISTER_FAILURE;
    payload: string; // Error message
}

export type AuthRegisterActions =
    | RegisterUserRequestAction
    | RegisterUserSuccessAction
    | RegisterUserFailureAction;

export type AuthActionTypes = LoginSuccessAction | LoginFailureAction | LogoutAction | LoginRequestAction | ClearAction;
