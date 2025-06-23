import usersSlice from "./usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice  from "./loaderSlice";

const Store1 = configureStore({
    reducer: {
        users: usersSlice,
        loader : loaderSlice
    }
});

export default Store1;
