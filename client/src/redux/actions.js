import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, SET_SEARCH, SET_USER, LOGOUT_USER, ADD_STATUS, EDIT_STATUS, DELETE_STATUS } from './type.js';

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

export const addStatus = (statusName, bg) => ({
    type: ADD_STATUS,
    payload: { statusName, bg }
});

export const editStatus = (oldStatus, newStatus, newBg) => ({
    type: EDIT_STATUS,
    payload: { oldStatus, newStatus, newBg }
});

export const deleteStatus = (statusName) => ({
    type: DELETE_STATUS,
    payload: { statusName }
});