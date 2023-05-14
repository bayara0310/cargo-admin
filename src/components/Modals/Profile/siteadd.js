import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Input, Spin, message } from 'antd';
import { Spinner } from '@chakra-ui/react';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import axios from 'axios';
import { siteadduri } from "../../../url/url"

const SiteAdd = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [iloading ,setILoading] = useState(false);
    const [data, setData] = useState({name: "", link:"", logo:""});

    const submit = async () => {
      if(data.logo === ""){
        return message.error("Зураг ороогүй байна...")
      }
        setLoading(true)
         try{
            const res = await axios.post(siteadduri, data)
            message.success('Амжилттай нэмлээ');
            handleClose();
            setLoading(false)
         }catch(err){
             console.log(err)
         }
    }

    const logoImage = async (url) => {
        if (url) {
          try {
            console.log(url)
            setData({...data, logo:url})
            setILoading(false);
          } catch (err) {
            setILoading(false);
            console.log(err);
          }
        } else {
          setILoading(false);
          return toast.warning("Зураг боловсруулж байна түр хүлээгээрэй");
        }
      };

    const handleSubmit = async (file) => {
    setILoading(true);
    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file)
        .then(() => {
        getDownloadURL(imageRef)
            .then((url) => {
            logoImage(url);
            })
            .catch((error) => {
            setILoading(false);
            console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
        setILoading(false);
        console.log(error.message);
        });
    };

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
                Вебсайт нэмэх
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <div>
                    <h1 className='text-sm mt-2'>Сайтын нэр</h1>
                    <Input onChange={e=> setData({...data, name:e.target.value})} placeholder='Сайтын нэр оруулах'/>
                    <h1 className='text-sm mt-2'>Сайтын холбоос</h1>
                    <Input onChange={e=> setData({...data, link:e.target.value})} className='' placeholder='Сайтын холбоос'/>
                    <h1 className='text-sm mt-2'>Сайтын лого</h1>
                    <div className='flex items-center'>
                    <Input onChange={(e) => handleSubmit(e.target.files[0])} className='' type='file'/>
                    {
                        iloading?
                        <Spin className='ml-4'/>
                        :
                        ""
                    }
                    </div>
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

export default SiteAdd