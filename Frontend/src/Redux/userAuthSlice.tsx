import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAuthStatus: false,
    accessToken: null, // ✅ store access token in memory
    userId: null,
};

export const userAuthSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action) => {
            console.log("✅ User logged in",action.payload.accessToken);
            console.log("✅ User logged in 2",action.payload.userId);
            state.userAuthStatus = true;
            state.accessToken = action.payload.accessToken; // only store access token
            state.userId = action.payload.userId
            // ❌ Do NOT store refresh token here
        },

        logout: (state) => {
            console.log("🚪 User logged out");
            state.userAuthStatus = false;
            state.accessToken = null;
            // refresh token is automatically cleared when backend clears cookie
        },

        setAccessToken: (state, action) => {
            // for refreshing expired tokens
            state.accessToken = action.payload;
        },
    },
});

export const { login, logout, setAccessToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
