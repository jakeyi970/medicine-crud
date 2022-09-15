import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ListItem, IconButton, TextField} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import actions from '../../store/actions'

export default function AddMedicineName({handleClose}: {
  handleClose: () => void
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const handleAdd = () => {
    if (!name) {
      setError(true);
      return;
    }
    actions.addMedicineName(name)(dispatch);
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
        label="Name" 
        error={error}
        value={name} 
        onChange={e => {
          if (!e.target.value) setError(true);
          else setError(false);
          setName(e.target.value)
        }}></TextField>
    </ListItem>
  )
}
