import { TUtils, TAction } from '../../@types'
import { SET_ERROR, SET_LOADING_CATEGORY, SET_LOADING_NAME, SET_LOADING_MEDICINE } from '../actionTypes'

const initialState: TUtils = {
  error: '',
  isLoadingMedicine: false,
  isLoadingName: false,
  isLoadingCategory: false
}

const reducer = function(state: TUtils = initialState, action: TAction) {
  switch(action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_LOADING_CATEGORY:
      return {
        ...state,
        isLoadingCategory: action.payload
      };
    case SET_LOADING_NAME:
      return {
        ...state,
        isLoadingName: action.payload
      };
    case SET_LOADING_MEDICINE:
      return {
        ...state,
        isLoadingMedicine: action.payload
      };
    default:
      return state;
  }
}

export default reducer;