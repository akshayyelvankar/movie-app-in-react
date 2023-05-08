import {createSlice} from '@reduxjs/toolkit';

export const homeReducer=createSlice({
    name:"home",
    initialState:{
        url:{},
        genres:{},
    },
    reducers:{
        getApiConfiguration:(state,action)=>{
            state.url=action.payload;
        },
        getGenres:(state,action)=>{
            state.genres=action.payload;
        },
    },
})

export const {getApiConfiguration,getGenres}=homeReducer.actions;
 

export default homeReducer.reducer;
