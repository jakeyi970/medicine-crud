import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogTemplate from '../utils/DialogTemplate'
import actions from '../../store/actions'
import { IMedicineCategory, TState } from '../../@types'
import { List, CircularProgress } from '@mui/material'
import MedicineCategoryItem from './MedicineCategoryItem'
import AddMedicineCategory from './AddMedicineCategory'
import EditMedicineCategory from './EditMedicineCategory'

const MedicineCategories = () => {
  const dispatch = useDispatch();
  const medicineCategories: IMedicineCategory[] = useSelector((state: TState) => state.medicineCategories);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const isLoadingCategory = useSelector((state: TState) => state.utils.isLoadingCategory);

  useEffect(() => {
    actions.fetchMedicineCategory()(dispatch);
  }, [dispatch])

  return (
    <DialogTemplate title="Medicine Categories" handleAdd={() => setIsAdding(true)}>
      {
        isLoadingCategory ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress />
        </div> :
        <List>
          {
            medicineCategories.map((category: IMedicineCategory) => 
            category.isEditing ? <EditMedicineCategory key={category.id} data={category} /> :
            <MedicineCategoryItem key={category.id} data={category} />)
          }
          {
            isAdding && <AddMedicineCategory handleClose={() => setIsAdding(false)} />
          }
        </List>
      }
    </DialogTemplate>
  )
}

export default MedicineCategories;