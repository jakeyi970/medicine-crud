import * as MedicineActions from './MedicineAction'
import * as MedicineNameActions from './MedicineNameAction'
import * as MedicineCategoryActions from './MedicineCategoryAction'

const actions = {
  ...MedicineActions,
  ...MedicineNameActions,
  ...MedicineCategoryActions,
};

export default actions;
