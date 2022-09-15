import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ListItem, IconButton, TextField, Divider } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import actions from '../../store/actions'
import { IMedicineName } from '../../@types';

export default function EditMedicineName({data}: {
  data: IMedicineName,
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(data.name);
  const [error, setError] = useState<boolean>(false);
  const handleEdit = () => {
    if (!name) {
      setError(true);
      return;
    }
    actions.updateMedicineName({
      id: data.id,
      name: name
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
                actions.editMedicineName({
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
          label="name" 
          error={error}
          value={name} 
          onChange={e => {
            if (!e.target.value) setError(true);
            else setError(false);
            setName(e.target.value);
          }} />
      </ListItem>
      <Divider />
    </>
  )
}
