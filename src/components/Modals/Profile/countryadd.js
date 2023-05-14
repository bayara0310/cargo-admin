import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Input, Spin, message } from 'antd';
import axios from 'axios';
import { countryadduri } from "../../../url/url"

const CountryAdd = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [iloading ,setILoading] = useState(false);
    const [data, setData] = useState({name: "", logo:"", sname:""});

    const submit = async () => {
        setLoading(true)
         try{
            const res = await axios.post(countryadduri, data)
            message.success('Амжилттай нэмлээ');
            handleClose();
            setLoading(false)
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
        <Button className='bg-blue-600 text-white' onClick={handleClickOpen}>
            Нэмэх
        </Button>
        <Dialog
            className='mb-60'
            fullWidth={true}
            maxWidth="md"
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                Улс нэмэх
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <div>
                    <h1 className='text-sm mt-2'>Улсын нэр</h1>
                    <Input onChange={e=> setData({...data, name:e.target.value})} placeholder='Улсын нэр оруулах'/>
                    <h1 className='text-sm mt-2'>Улсын далбаа</h1>
                    <Input onChange={e=> setData({...data, logo:e.target.value})} className='' placeholder='Далбааны линк'/>
                    <h1 className='text-sm mt-2'>Улсын товч нэр</h1>
                    <Input onChange={e=> setData({...data, sname:e.target.value})} className='' placeholder='KOR, GER, USA'/>
                </div>
            </DialogContentText>
            </DialogContent>
            <DialogActions className='mt-4'>
            <div className='text-sm mr-4 cursor-pointer hover:text-gray-500' onClick={handleClose}>Гарах</div>
            <div onClick={submit} className='text-sm mr-4 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded py-2 px-4 text-white'>
                {
                loading &&
                <Spin className='mr-2'/>
                }
                Нэмэх</div>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default CountryAdd