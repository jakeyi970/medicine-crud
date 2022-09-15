import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { TextField, List, ListItem, Select, MenuItem, FormControl, FormHelperText, InputLabel } from '@mui/material'
import DialogTemplate from '../utils/DialogTemplate'
import { TState, IMedicine } from '../../@types'
import isValid from '../utils/isValid'

const AddMedicine = ({title, medicine, isEdit = false, addMedicine}: {
  title: string,
  medicine?: IMedicine,
  isEdit?: boolean,
  addMedicine: (currentMedicine: IMedicine) => void
}) => {
  console.log(isEdit);
  const medicineNames = useSelector((state: TState) => state.medicineNames);
  const medicinCategories = useSelector((state: TState) => state.medicineCategories);

  const [currentMedicine, setCurrentMedicine] = useState<IMedicine>(medicine ? medicine : {
    id: 0,
    MedicineName: '',
    Code: '',
    DisplayName: '',
    Price: 0,
    Category: '',
  });

  const {error, valid} = useMemo(() => isValid(currentMedicine), [currentMedicine]);

  return (
    <div style={{display: 'inline'}}>
      <DialogTemplate title={title} actionTitle="OK" isValid={valid} handleAdd={() => {
        if (!valid) return;
        addMedicine(currentMedicine);
        if (!medicine) {
          setCurrentMedicine({
            id: 0,
            MedicineName: '',
            Code: '',
            DisplayName: '',
            Price: 0,
            Category: '',
          });
        }
      }} color="success">
        <List>
          <ListItem>
          <FormControl fullWidth 
              error={error.MedicineName ? true: false}>
            <InputLabel id="medicine-name">Medicine Name</InputLabel>
            <Select 
              error={error.MedicineName ? true: false}
              labelId="medicine-name"
              label="Medicine Name"
              value={currentMedicine.MedicineName}
              onChange={e => setCurrentMedicine({
                ...currentMedicine,
                MedicineName: e.target.value
              })}
              inputProps={{ readOnly: isEdit }}
              fullWidth>
              {
                medicineNames.map(name => <MenuItem key={name.id} value={name.name}>{name.name}</MenuItem>)
              }
            </Select>
            <FormHelperText>{error.MedicineName}</FormHelperText>
          </FormControl>
          </ListItem>
          <ListItem>
            <TextField 
              error={error.DisplayName ? true: false}
              label="Display Name" 
              value={currentMedicine.DisplayName} 
              onChange={e => setCurrentMedicine({
                ...currentMedicine,
                DisplayName: e.target.value
              })}
              helperText={error.DisplayName}
              fullWidth />
          </ListItem>
          <ListItem>
            <TextField 
              error={error.Price ? true: false}
              type="number" 
              label="Price Name" 
              value={currentMedicine.Price} 
              onChange={e => setCurrentMedicine({
                ...currentMedicine,
                Price: parseInt(e.target.value)
              })}
              helperText={error.Price}
              fullWidth />
          </ListItem>          
          <ListItem>
            <FormControl fullWidth 
              error={error.Category ? true: false}>
              <InputLabel id="category">Category</InputLabel>
              <Select 
                error={error.Category ? true: false}
                label="Category" 
                value={currentMedicine.Category} 
                onChange={e => setCurrentMedicine({
                  ...currentMedicine,
                  Category: e.target.value
                })}
                fullWidth>
                {
                  medicinCategories.map(name => <MenuItem key={name.id} value={name.name}>{name.name}</MenuItem>)
                }
              </Select>
              <FormHelperText>{error.Category}</FormHelperText>
            </FormControl>
          </ListItem>          
        </List>
      </DialogTemplate>
    </div>
  )
}

export default AddMedicine;