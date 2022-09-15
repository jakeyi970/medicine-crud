import { TAction, IMedicineName } from '../../@types'
import { 
  ADD_MEDICINE_NAME, 
  UPDATE_MEDICINE_NAME, 
  REMOVE_MEDICINE_NAME, 
  FETCH_MEDICINE_NAME, 
  EDIT_MEDICINE_NAME 
} from '../actionTypes'

const initialState: IMedicineName[] = [];

const reducer = function(state: IMedicineName[] = initialState, action: TAction) {
  switch (action.type) {
    case ADD_MEDICINE_NAME:
      return [
        ...state,
        action.payload
      ];
    case FETCH_MEDICINE_NAME:
      return action.payload;
    case UPDATE_MEDICINE_NAME:
      return state.map((name: IMedicineName) => name.id === action.payload.id ? action.payload: name);
    case EDIT_MEDICINE_NAME:
      return state.map((name: IMedicineName) => name.id === action.payload.id ? {
        ...name,
        isEditing: action.payload.isEditing
      } : name);
    case REMOVE_MEDICINE_NAME:
      return state.filter((name: IMedicineName) => name.id !== action.payload.id);
    default:
      return state;
  }
}

export default reducer;