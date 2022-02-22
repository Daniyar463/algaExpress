import {createSlice} from "@reduxjs/toolkit";

const name = 'buyout'
const initialState = {
    buyouts: [],
    singleBuyout: null,
    fetchLoading: false,
    createLoading: false,
    createError: null,
    deleteLoading: false,
    deleteError:null,
}

const buyoutSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchBuyoutsRequest(state) {
            state.fetchLoading = true;
        },
        fetchBuyoutsSuccess(state, {payload: buyouts}) {
            state.buyouts = buyouts;
            state.fetchLoading = false;
        },
        fetchBuyoutsFailure(state) {
            state.fetchLoading = false;
        },
        addBuyoutRequest(state){
            state.createLoading = true;
        },
        addBuyoutSuccess(state) {
            state.createLoading = false;
            state.createError = null;
        },
        addBuyoutFailure(state,action ){
            state.createLoading = false;
            state.createError = action.payload;
        },
        deleteBuyoutRequest(state){
            state.deleteLoading = true;
        },
        deleteBuyoutSuccess(state,{payload:id}){
            state.deleteLoading = false;
            state.deleteError =null;
            state.sites = state.sites.filter(site=>site._id!==id);
        },
        deleteBuyoutFailure(state,{payload:error}){
            state.deleteLoading = false;
            state.deleteError = error;
        },
        fetchSingleBuyoutRequest(state){
            state.fetchLoading = true;
        },
        fetchSingleBuyoutSuccess(state,{payload: data}){
            state.fetchLoading = false;
            state.singleBuyout=data;
        },
        fetchSingleBuyoutFailure(state){
            state.fetchLoading=false;
        },
        clearBuyoutsError(state){
            state.createError=null;
        },
        editBuyoutRequest(state){
            state.createLoading = true;
        },
        editBuyoutSuccess(state){
            state.createLoading = false;
        },
        editBuyoutFailure(state,action){
            state.createLoading =false;
            state.createError = action.payload;
        }
    }
});

export default buyoutSlice;