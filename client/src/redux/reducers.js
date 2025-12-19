import {ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, SET_SEARCH, SET_USER, LOGOUT_USER, ADD_STATUS, EDIT_STATUS, DELETE_STATUS} from "./type.js";

const initialState = {
    contacts: [
        {
            avatar: "66",
            email: "robert.admin@example.com",
            favorite: true,
            firstName: "Robert",
            gender: "men",
            id: "0ade6e5f-07ef-4ed2-85de-b940aabea656",
            lastName: "Barnabishvili",
            phone: "0680423116",
            status: "family",
        },
        {
            avatar: "12",
            email: "anna.green@example.com",
            favorite: false,
            firstName: "Anna",
            gender: "women",
            id: "4f1b3b6e-31ce-4a6d-9af1-2f3cbb7f91e3",
            lastName: "Green",
            phone: "0952143321",
            status: "friends",
        },
        {
            avatar: "73",
            email: "michael.ross@example.com",
            favorite: true,
            firstName: "Michael",
            gender: "men",
            id: "9be8a9e3-44a3-4ba7-91da-6e26042c4e71",
            lastName: "Ross",
            phone: "0935417854",
            status: "work",
        },
        {
            avatar: "18",
            email: "lisa.moon@example.com",
            favorite: false,
            firstName: "Lisa",
            gender: "women",
            id: "e45f531f-1bb1-456d-a5f4-e9b390fd3d0f",
            lastName: "Moon",
            phone: "0978732164",
            status: "private",
        },
        {
            avatar: "29",
            email: "kevin.snow@example.com",
            favorite: false,
            firstName: "Kevin",
            gender: "men",
            id: "7a9a4a90-060e-4aca-b7d3-63f96cdcf61d",
            lastName: "Snow",
            phone: "0966549921",
            status: "others",
        },
        {
            avatar: "47",
            email: "mary.wood@example.com",
            favorite: true,
            firstName: "Mary",
            gender: "women",
            id: "efdc0d58-5c59-4af7-94a8-d5ba9330e2a7",
            lastName: "Wood",
            phone: "0990023144",
            status: "family",
        },
        {
            avatar: "52",
            email: "alex.kent@example.com",
            favorite: false,
            firstName: "Alex",
            gender: "men",
            id: "f97b5d43-5581-4a44-8a8d-56cf07f022a9",
            lastName: "Kent",
            phone: "0637432299",
            status: "work",
        },
        {
            avatar: "15",
            email: "sofia.miller@example.com",
            favorite: true,
            firstName: "Sofia",
            gender: "women",
            id: "3cba40e7-eeca-4ced-afaf-8ed6eac31a3a",
            lastName: "Miller",
            phone: "0508221347",
            status: "friends",
        },
        {
            avatar: "91",
            email: "john.white@example.com",
            favorite: false,
            firstName: "John",
            gender: "men",
            id: "a6c32937-c1b5-4b4d-93c4-e18a5e590fe0",
            lastName: "White",
            phone: "0679435561",
            status: "private",
        },
        {
            avatar: "33",
            email: "nataly.brown@example.com",
            favorite: false,
            firstName: "Nataly",
            gender: "women",
            id: "da02b49b-31f9-4b35-ae56-c35f8e49dd12",
            lastName: "Brown",
            phone: "0912345689",
            status: "others",
        }
    ],
    contactStatuses: {
        work: { count: 0, bg: '#3b82f6' },
        family: { count: 0, bg: '#22c55e' },
        private: { count: 0, bg: '#a855f7' },
        friends: { count: 0, bg: '#eab308' },
        others: { count: 0, bg: '#ef4444' }
    },
    search: '',
    auth: {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {...state, contacts: [...state.contacts, action.payload]}
        
        case EDIT_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => 
                    contact.id === action.payload.id ? action.payload.updatedContact : contact
                )
            }
        
        case DELETE_CONTACT:
            return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload)}
        
        case SET_SEARCH:
            return {...state, search: action.payload}
        
        case SET_USER:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {...state, auth: {token: action.payload.token, user: action.payload.user}}
        
        case LOGOUT_USER:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {...state, auth: {token: null, user: null}}
        
        case ADD_STATUS:
            if(state.contactStatuses[action.payload.statusName]){
                return state
            }
            return {
                ...state,
                contactStatuses: {
                    ...state.contactStatuses,
                    [action.payload.statusName]: { count: 0, bg: action.payload.bg }
                }
            }
        
        case EDIT_STATUS: {
            if(!state.contactStatuses[action.payload.oldStatus]){
                return state
            }
            const oldStatusData = state.contactStatuses[action.payload.oldStatus];
            const updatedStatuses = {...state.contactStatuses};
            delete updatedStatuses[action.payload.oldStatus];
            updatedStatuses[action.payload.newStatus] = { 
                count: oldStatusData.count, 
                bg: action.payload.newBg 
            };
            const updatedContacts = state.contacts.map(contact => 
                contact.status === action.payload.oldStatus 
                    ? {...contact, status: action.payload.newStatus} 
                    : contact
            );
            return {
                ...state,
                contactStatuses: updatedStatuses,
                contacts: updatedContacts
            }
        }
        
        case DELETE_STATUS: {
            if(!state.contactStatuses[action.payload.statusName]){
                return state
            }
            const newStatuses = {...state.contactStatuses};
            delete newStatuses[action.payload.statusName];
            const contactsAfterDelete = state.contacts.map(contact => 
                contact.status === action.payload.statusName 
                    ? {...contact, status: 'others'} 
                    : contact
            );
            return {
                ...state,
                contactStatuses: newStatuses,
                contacts: contactsAfterDelete
            }
        }
        
        default:
            return state;
    }
}

export default reducer;
