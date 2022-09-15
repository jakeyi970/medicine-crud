import React from 'react';
import { Typography, Container } from '@mui/material'
import MedicineNames from './components/medicine-names/MedicineNames';
import MedicineCategories from './components/medicine-categories/MedicineCategories';
import Medicine from './components/medicine/MedicineTable'

function App() {
  return (
    <Container style={{marginTop: '30px'}}>
      <Typography variant="h3" style={{textAlign: 'center'}}> Medicine </Typography>
      <MedicineNames /> 
      <MedicineCategories />
      <Medicine />
    </Container>
  );
}

export default App;
