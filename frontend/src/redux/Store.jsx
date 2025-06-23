import usersSlice from "./usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice  from "./loaderSlice";

const Store = configureStore({
    reducer: {
        users: usersSlice,
        loader : loaderSlice
    }
});

export default Store;