import { createContext } from "react";

export const authContext = createContext();

export const initialState = {
    auth: {
        "isAuthenticated": false
    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state
    }
}
