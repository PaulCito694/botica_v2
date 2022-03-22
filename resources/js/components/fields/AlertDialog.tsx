import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {useState} from "react"

const AlertDialog = ({title, message, setState, idRecord}:any) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={()=>{
            setState(idRecord)
            setOpen(false)
          }}
        >
          Aceptar
        </Button>
        <Button
          onClick={()=>{
            setState(idRecord)
            setOpen(false)
          }}
          autoFocus
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
