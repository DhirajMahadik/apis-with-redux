import { configureStore } from "@reduxjs/toolkit";
import  UsersData  from "./Redux/Slices/UserSlice";


export const store = configureStore({
    reducer:{
       UsersData
    }
})