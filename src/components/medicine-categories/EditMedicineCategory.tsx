import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ListItem, IconButton, TextField, Divider } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import actions from '../../store/actions'
import { IMedicineCategory } from '../../@types';

export default function EditMedicineCategory({data}: {
  data: IMedicineCategory,
}) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>(data.name);
  const [error, setError] = useState<boolean>(false);
  const handleEdit = () => {
    if (!category) {
      setError(true);
      return;
    }
    actions.updateMedicineCategory({
      id: data.id,
      name: category
    })(dispatch);
  }
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton 
              edge="end" 
              aria-label="edit" 
              color="primary"
              onClick={handleEdit} > 
              <CheckIcon /> 
            </IconButton>

            <IconButton 
              edge="end" 
              aria-label="close"
              color="error" 
              onClick={() => {
                actions.editMedicineCategory({
                  id: data.id,
                  isEditing: false
                })(dispatch)
              }}> 
              <CloseIcon /> 
            </IconButton>
          </>
        }
      >
        <TextField 
          label="Category" 
          error={error}
          value={category} 
          onChange={e => {
            if (!e.target.value) setError(true);
            else setError(false);
            setCategory(e.target.value);
          }} />
      </ListItem>
      <Divider />
    </>
  )
}
