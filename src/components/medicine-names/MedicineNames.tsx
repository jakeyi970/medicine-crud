import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogTemplate from '../utils/DialogTemplate'
import actions from '../../store/actions'
import { IMedicineName, TState } from '../../@types'
import { List, CircularProgress } from '@mui/material'
import MedicineNameItem from './MedicineNameItem'
import AddMedicineName from './AddMedicineName'
import EditMedicineName from './EditMedicineName'

const MedicineNames = () => {
  const dispatch = useDispatch();
  const medicineNames: IMedicineName[] = useSelector((state: TState) => state.medicineNames);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const isLoadingName = useSelector((state: TState) => state.utils.isLoadingName);

  useEffect(() => {
    actions.fetchMedicineName()(dispatch);
  }, [dispatch])

  return (
    <DialogTemplate title="Medicine Names" handleAdd={() => setIsAdding(true)}>
      {
        isLoadingName ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress />
        </div> :
        <List>
          {
            medicineNames.map((name: IMedicineName) => 
            name.isEditing ? <EditMedicineName key={name.id} data={name} /> :
            <MedicineNameItem key={name.id} data={name} />)
          }
          {
            isAdding && <AddMedicineName handleClose={() => setIsAdding(false)} />
          }
        </List>
      }
    </DialogTemplate>
  )
}

export default MedicineNames;