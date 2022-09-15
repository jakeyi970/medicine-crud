import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TState } from '../../@types';

const DialogTemplate = ({title, handleAdd, actionTitle="Add", color="primary", isValid = true, closeWhenAdd=false, children}: {
  title: string,
  handleAdd: () => void,
  actionTitle?: string,
  closeWhenAdd?: boolean,
  isValid?: boolean,
  color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning",
  children: JSX.Element
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const isLoadingMedicine = useSelector((state: TState) => state.utils.isLoadingMedicine);

  useEffect(() => {
    if (isLoadingMedicine) handleClose();
  }, [isLoadingMedicine]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display: 'inline', margin: '10px'}}>
      <Button variant="outlined" onClick={handleClickOpen} color={color} style={{margin: '10px'}}>
        { title }
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          { title }
        </DialogTitle>
        <DialogContent>
          {
            children
          }
        </DialogContent>
        <DialogActions>
          <Button disabled={!isValid} onClick={() => {
            if (closeWhenAdd) handleClose()
            handleAdd()
          }}> {actionTitle} </Button>
          <Button onClick={handleClose} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogTemplate;
