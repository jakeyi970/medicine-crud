import { combineReducers } from 'redux'
import MedicineReducer from './MedicineReducer'
import MedicineNameReducer from './MedicineNameReducer'
import MedicineCategoryReducer from './MedicineCategoryReducer'
import UtilsReducer from './UtilsReducer'

export default combineReducers({
  medicines: MedicineReducer,
  medicineNames: MedicineNameReducer,
  medicineCategories: MedicineCategoryReducer,
  utils: UtilsReducer
})