import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { cargostatusupdate } from 'url/url';
import { Spinner, useToast } from '@chakra-ui/react';
import { orderDetailUri } from 'url/url';
import moment from 'moment';
import { orderStatusUri } from 'url/url';
import { BARAA } from 'url/types';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { orderImageUri } from 'url/url';

export default function MoreOrder(id) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [iloading, setILoading] = useState(false)
  const toast = useToast();
  const [cargos, setCargos] = useState({});
  const [data, setData] = useState({invoice:"", image:"", track: ""});

  useEffect(() => {
    loadProfile();
  }, []);

    const loadProfile = async () => {
        try{
            const res = await axios.get(orderDetailUri + `${id.id}`);
            setCargos(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const SubmitData = async () => {
      const invoice = data.invoice;
      const image = data.image;
      const track = data.track
      setLoading(true);
      
      if(cargos.status === BARAA.REGISTERED){
        try{
          const res = await axios.post(orderStatusUri + `${id.id}`, { status: BARAA.APPROVED });
          console.log(res.data, "resdata");
          if(res.status === 200){
            setLoading(false)
            handleClose();
            toast({
              title: `Амжилттай баталгаажлаа`,
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
      if(cargos.status === BARAA.APPROVED){
        try{
          const res = await axios.post(orderImageUri + `${id.id}`, {invoice: invoice, image: image, status: BARAA.RECEIVED, track:track });
          console.log(res.data, "resdata");
          if(res.status === 200){
            setLoading(false)
            handleClose();
            toast({
              title: `Амжилттай баталгаажлаа`,
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
      if(cargos.status === BARAA.RECEIVED){
        try{
          const res = await axios.post(orderStatusUri + `${id.id}`, { status: BARAA.CAME });
          console.log(res.data, "resdata");
          if(res.status === 200){
            setLoading(false)
            handleClose();
            toast({
              title: `Амжилттай баталгаажлаа`,
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
      if(cargos.status === BARAA.CAME){
        try{
          const res = await axios.post(orderStatusUri + `${id.id}`, { status: BARAA.CONFIRM });
          console.log(res.data, "resdata");
          if(res.status === 200){
            setLoading(false)
            handleClose();
            toast({
              title: `Амжилттай баталгаажлаа`,
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
      // window.location.reload();
    }

    const logoImage = async (url) => {
      if (url) {
        try {
          console.log(url)
          setData({...data, image:url})
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
      <Button variant="simple" onClick={handleClickOpen}>
        Дэлгэрэнгүй
      </Button>
      <Dialog
        className='mb-60'
        maxWidth="md"
        fullWidth="400px"
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
            <div className='flex justify-between'>
                <div>
                <h1>Барааны төрөл*</h1>
                <h2 className='text-sm'>{cargos?.type}</h2>
                </div>
                <div className='cursor-pointer'>
                <AiOutlineClose onClick={handleClose}/>
                </div>
            </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>
              <div>
                <h1 className='text-sm font-semibold mb-2'>Линк *</h1>
                <p className='text-sm'>{cargos?.link}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Нэгж үнэ *</h1>
                <p className='text-sm'>{cargos?.price}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Тоо ширхэг *</h1>
                <p className='text-sm'>{cargos?.number}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Өнгө *</h1>
                <p className='text-sm'>{cargos?.color}</p>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Бүртгүүлэсэн өдөр *</h1>
                <p className='text-sm'>{moment(cargos?.date).format("l")}</p>
              </div>
              {
                cargos.status===BARAA.APPROVED ?
                ""
                :
                <>
                <div className='mt-4'>
                  <h1 className='text-sm font-semibold mb-2'>Зураг *</h1>
                  <div>
                    <img src={cargos?.image}/>
                  </div>
                </div>
                <div className='mt-4'>
                  <h1 className='text-sm font-semibold mb-2'>Төлбөр *</h1>
                  <div>
                  <p className='text-lg font-bold'>{cargos?.invoice} ₮</p>
                  </div>
                </div>
                </>
              }
             {
              cargos.status === BARAA.APPROVED&&
              <>
               <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Трак код оруулах *</h1>
                <input className='text-sm rounded ring-1 outline-none py-1 px-2' placeholder='Трак код оруулах'
                onChange={e=>setData({...data, track:e.target.value})}
                />
              </div>

              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Зураг оруулах *</h1>
                <div className='flex items-center'>
                  <input type='file' className='text-sm rounded ring-1'
                  onChange={(e) => handleSubmit(e.target.files[0])}
                  />
                 {
                  iloading?
                  <h1 className='text-sm ml-4 animate-bounce'>Зураг оруулж байна...</h1>
                  :
                  ""
                 }
                 {
                  data.image &&
                      <h1 className='text-sm ml-4'>Зураг орууласан</h1>
                 }
                </div>
              </div>
              <div className='mt-4'>
                <h1 className='text-sm font-semibold mb-2'>Карго төлбөр *</h1>
                <input type='number' className='text-sm rounded ring-1 outline-none py-1 px-2' placeholder='Төлбөр оруулах'
                onChange={e=>setData({...data, invoice:e.target.value})}
                />
              </div>
              </>
             }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='mt-4'>
          <div className='text-sm mr-4 cursor-pointer hover:text-gray-500' onClick={handleClose}>Гарах</div>
          {
            cargos.status === BARAA.CONFIRM ?
            ""
            :
            <div className='text-sm mr-4 cursor-pointer bg-green-600 hover:bg-green-700 rounded py-2 px-4 text-white' onClick={SubmitData}>
            {
              loading &&
              <Spinner className='mr-2'/>
            }
            Баталгаажуулах</div>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}