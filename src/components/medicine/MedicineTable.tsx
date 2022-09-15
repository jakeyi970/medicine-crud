import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableHead, TableCell, TableRow, Backdrop, CircularProgress, TablePagination, TextField } from '@mui/material'
import actions from '../../store/actions'
import { IMedicine, TState } from '../../@types'
import AddMedicine from './AddMedicine'
import DialogTemplate from '../utils/DialogTemplate'

const RemoveMedicine = ({title, medicine, removeMedicine}: {
  title: string,
  medicine: IMedicine,
  removeMedicine: (currentMedicine: IMedicine) => void
}) => {
  return (
    <div style={{display: 'inline'}}>
      <DialogTemplate title={title} actionTitle="Yes" handleAdd={() => {
        removeMedicine(medicine)
      }} color="error">
        <span>{`Are you really want to remove ${medicine?.DisplayName}?`}</span>
      </DialogTemplate>
    </div>
  )
};

const MedicineTable = () => {
  const dispatch = useDispatch();
  const medicines = useSelector((state: TState) => state.medicines)
  const showLoading = useSelector((state: TState) => state.utils.isLoadingMedicine)
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState<string>('');
  useEffect(() => {
    actions.fetchMedicine()(dispatch);
  }, [dispatch]);

  const searchedMedicine = useMemo(() => {
    if (!search) return medicines;
    return medicines.filter((medicine: IMedicine) => medicine.MedicineName.includes(search) || medicine.DisplayName.includes(search))
  }, [search, medicines]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div style={{float: 'right'}}>
        <TextField value={search} label="Search" onChange={e => {
          setSearch(e.target.value)
          setPage(0);
        }}/>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Medicine Name </TableCell>
            <TableCell> Display Name </TableCell>
            <TableCell> Category </TableCell>
            <TableCell> Price </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            searchedMedicine.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((medicine: IMedicine ) => <TableRow key={medicine.id}>
              <TableCell>{medicine.MedicineName}</TableCell>
              <TableCell>{medicine.DisplayName}</TableCell>
              <TableCell>{medicine.Category}</TableCell>
              <TableCell>{medicine.Price}</TableCell>
              <TableCell>
                <AddMedicine title="Edit" medicine={medicine} isEdit={true} addMedicine={(currentMedicine: IMedicine) => {
                  actions.updateMedicine(currentMedicine)(dispatch);
                }} />
                <RemoveMedicine title="Remove" medicine={medicine} removeMedicine={(currentMedicine: IMedicine) => {
                  actions.removeMedicine(currentMedicine.id)(dispatch);
                }} />
              </TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent: 'end', marginTop: '10px'}}>
        <TablePagination 
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={searchedMedicine.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} 
        />
      </div>
      <AddMedicine title="Add Medicine" addMedicine={(currentMedicine: IMedicine) => {
        actions.addMedicine(currentMedicine)(dispatch);
      }} />
    </div>
  )
}

export default MedicineTable;