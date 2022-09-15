import React from 'react'
import { ListItem, IconButton, ListItemText, Divider } from '@mui/material'
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import actions from '../../store/actions'
import { IMedicineCategory } from '../../@types';

export default function MedicineCategoryItem({data}: {
  data: IMedicineCategory
}) {
  const dispatch = useDispatch();
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton 
              edge="end" 
              aria-label="edit" 
              onClick={() => actions.editMedicineCategory({
                id: data.id,
                isEditing: true,
              })(dispatch)}> 
                <EditIcon /> 
              </IconButton>
            <IconButton 
              edge="end" 
              aria-label="delete"
              onClick={() => actions.removeMedicineCategory(data.id)(dispatch)}> 
                <DeleteIcon /> 
              </IconButton>
          </>
        }
      >
        <ListItemText
          primary={data.name}
        />
      </ListItem>
      <Divider />
    </>
  )
}
