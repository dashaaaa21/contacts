import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, SET_SEARCH, SET_USER, LOGOUT_USER } from './type.js';

export const addContact = (contact) => ({
    type: ADD_CONTACT,
    payload: contact
});

export const editContact = (id, updatedContact) => ({
    type: EDIT_CONTACT,
    payload: { id, updatedContact }
});

export const deleteContact = (id) => ({
    type: DELETE_CONTACT,
    payload: id
});

export const setSearch = (searchText) => ({
    type: SET_SEARCH,
    payload: searchText
});

export const setUser = (userData) => ({
    type: SET_USER,
    payload: userData
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});