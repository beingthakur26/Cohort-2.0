import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/auth.slice.js";
import chatReducer from "../store/slices/chat.slice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
});
