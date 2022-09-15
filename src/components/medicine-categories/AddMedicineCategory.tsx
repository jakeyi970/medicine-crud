import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ListItem, IconButton, TextField} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import actions from '../../store/actions'

export default function AddMedicineCategory({handleClose}: {
  handleClose: () => void
}) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const handleAdd = () => {
    if (!category) {
      setError(true);
      return;
    }
    actions.addMedicineCategory(category)(dispatch);
  }
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton 
            edge="end" 
            aria-label="edit" 
            color="primary" 
            onClick={handleAdd} 
          > 
            <CheckIcon /> 
          </IconButton>
          <IconButton edge="end" aria-label="delete" color="error" onClick={handleClose}> <CloseIcon /> </IconButton>
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
          setCategory(e.target.value)
        }}></TextField>
    </ListItem>
  )
}
