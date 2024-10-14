import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    createFeature, createSubFeature,
    deleteSubFeature,
    getAllSubFeatures,
    updateSubFeatureByUid
} from "../../../api/requests";

const initialState = {
    list: [],
    isLoading: false,
    isCreateLoading: false,
}
export const getSubFeaturesList = createAsyncThunk(
    "Features/getSubFeaturesList",
    getAllSubFeatures
);

export const createSubFeatureList = createAsyncThunk(
    "Features/createSubFeatureList",
    createSubFeature
)

export const deleteSubFeatureByUid = createAsyncThunk(
    "Features/deleteSubFeatureByUid",
    deleteSubFeature
)
export const updateSubFeature = createAsyncThunk(
    "Features/updateSubFeature",
    updateSubFeatureByUid
)
export const subFeaturesReducer = createSlice({
    name: 'SubFeatures/AsyncActions',
    initialState,
    reducers: {
        getSubFeatures: (state, {payload}) => {
            state.list = payload.features
            state.pageCount = payload.countPage
        }
    },
    extraReducers: {
        [getSubFeaturesList.pending]: (state) => {
            state.isLoading = true
        },
        [getSubFeaturesList.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.list = payload
        },
        [getSubFeaturesList.rejected]: (state) => {
            state.isLoading = false
        },
        [createSubFeatureList.pending]: (state) => {
            state.isCreateLoading = true
        },
        [createSubFeatureList.fulfilled]: (state, {payload}) => {
            state.isCreateLoading = false
        },
        [createSubFeatureList.rejected]: (state) => {
            state.isCreateLoading = false
        }
    }
})

export default subFeaturesReducer.reducer;