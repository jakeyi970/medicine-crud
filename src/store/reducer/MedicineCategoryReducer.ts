import { TAction, IMedicineCategory } from '../../@types'
import { 
  ADD_MEDICINE_CATEGORY, 
  UPDATE_MEDICINE_CATEGORY, 
  REMOVE_MEDICINE_CATEGORY, 
  FETCH_MEDICINE_CATEGORY, 
  EDIT_MEDICINE_CATEGORY 
} from '../actionTypes'

const initialState: IMedicineCategory[] = [];

const reducer = function(state: IMedicineCategory[] = initialState, action: TAction) {
  switch (action.type) {
    case ADD_MEDICINE_CATEGORY:
      return [
        ...state,
        action.payload
      ];
    case FETCH_MEDICINE_CATEGORY:
      return action.payload;
    case UPDATE_MEDICINE_CATEGORY:
      return state.map((category: IMedicineCategory) => category.id === action.payload.id ? action.payload: category);
    case EDIT_MEDICINE_CATEGORY:
      return state.map((category: IMedicineCategory) => category.id === action.payload.id ? {
        ...category,
        isEditing: action.payload.isEditing
      } : category);
    case REMOVE_MEDICINE_CATEGORY:
      return state.filter((category: IMedicineCategory) => category.id !== action.payload.id);
    default:
      return state;
  }
}

export default reducer;