import { IMedicine, TAction } from '../../@types'
import { ADD_MEDICINE, FETCH_MEDICINE, UPDATE_MEDICINE, REMOVE_MEDICINE } from '../actionTypes';

const initialState: IMedicine[] = [];

const reducer = function(state: IMedicine[] = initialState, action: TAction) {
  switch(action.type) {
    case ADD_MEDICINE: 
      return [
        ...state,
        action.payload
      ]
    case FETCH_MEDICINE:
      return action.payload;
    case UPDATE_MEDICINE:
      return state.map((medicine: IMedicine) => medicine.id === action.payload.id ? action.payload : medicine)
    case REMOVE_MEDICINE:
      return state.filter((medicine: IMedicine) => medicine.id !== action.payload.id)
    default:
      return state;
  }
}

export default reducer;