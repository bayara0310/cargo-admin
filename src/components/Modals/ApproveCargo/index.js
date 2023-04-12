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
import { cargostatusupdate } from 'url/url';
import { Spinner, useToast } from '@chakra-ui/react';
import { adminadd } from 'url/url';

export default function ApproveModal(id) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const [cargos, setCargos] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

    const loadProfile = async () => {
        try{
            const res = await axios.get(cargoone + `${id.id}`);
            setCargos(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const SubmitData = async () => {
        const email = cargos.email;
        const password = cargos.phone_number;
        const cargoid = cargos._id;
        const username = cargos.cargo_name;
      setLoading(true);
      try{
          const res = await axios.post(adminadd, {email: email, password: password, cargoid: cargoid, username: username});

          if(res.status === 200){
            setLoading(false)
            handleClose();
            toast({
              title: `Хэрэглэгчийн и-мейл хаягруу баталгаажуулах мейл илгээлээ.`,
              position: 'top',
              isClosable: true,
              status: 'success',
              duration: 9000,
            })
          }
          
          setLoading(false)
      }catch(err){
        setLoading(false)
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
            <div>
              <div>
                <h1 className='text-sm font-semibold mb-2'>Лого *</h1>
                <img className='h-40' src={cargos.logo}/>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Ковер зураг *</h1>
                <img src={cargos.cover_image}/>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Танилцуулга *</h1>
                <p className='text-sm'>{cargos.overview}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Вебсайт *</h1>
                <p className='text-sm'>{cargos.website}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Хаяг *</h1>
                <p className='text-sm'>{cargos.address}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>И-мейл, утасны дугаар *</h1>
                <p className='text-sm'>{cargos.phone_number} {cargos.email}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Бүртгүүлэсэн он сар өдөр *</h1>
                <p className='text-sm'>{cargos.createdAt}</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='mt-4'>
          <div className='text-sm mr-4 cursor-pointer hover:text-gray-500' onClick={handleClose}>Гарах</div>
          <div className='text-sm mr-4 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded py-2 px-4 text-white' onClick={SubmitData}>
            {
              loading &&
              <Spinner className='mr-2'/>
            }
            Админ эрх үүсгэх</div>
        </DialogActions>
      </Dialog>
    </div>
  );
}