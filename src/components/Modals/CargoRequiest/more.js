import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios';
import { cargoone } from 'url/url';
import { useEffect, useState } from 'react';

export default function MoreModal(id) {
  const [open, setOpen] = React.useState(false);

  const [cargos, setCargos] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

    const loadProfile = async () => {
        console.log("ahha")
        try{
            const res = await axios.get(cargoone + `${id.id}`);
            setCargos(res.data)
        }catch(err){
            console.log(err)
        }
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="simple" onClick={handleClickOpen}>
        Дэлгэрэнгүй
      </Button>
      <Dialog
        className='mb-60'
        maxWidth="md"
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
            <div className='flex justify-between'>
                <h1>{cargos.cargo_name}</h1>
                <div className='cursor-pointer'>
                <AiOutlineClose onClick={handleClose}/>
                </div>
            </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='text-sm mr-4 cursor-pointer' onClick={handleClose}>Гарах</div>
          <div className='text-sm mr-4 cursor-pointer bg-green-600 rounded py-1 px-4 text-white' onClick={handleClose}>Баталгаажуулах</div>
        </DialogActions>
      </Dialog>
    </div>
  );
}