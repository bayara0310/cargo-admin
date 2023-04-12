
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { Spinner, useToast } from '@chakra-ui/react'

// Images
import curved9 from "assets/images/curved-images/cargo.jpg";
import axios from "axios";
import { adminactivationuri } from "url/url";

function Activate() {
  const toast = useToast();
  const navigate = useNavigate();
  const router = useLocation();
  const a = router.pathname;
  const t = a.slice(25)
  const [load, setLoad] = useState(false);

  const clickSubmit = async() => {
    setLoad(true);
    try{
      const res = await axios.post(adminactivationuri, {token: t});
      setLoad(false);
      navigate("/authentication/sign-in")
      toast({
        title: "Амжилттай баталгаажлаа",
        description: "Таны имейл хаягт нэвтрэх нэр нууц үг очсон имейл хаягаа шалгана уу !",
        position: 'top',
        status: 'success',
        isClosable: true,
        duration: 8000,
      })
    }catch(err){
      setLoad(false);
      toast({
        title: err.response.data.error,
        position: 'top',
        isClosable: true,
        duration: 5000,
      })
    }
  }

  return (
    <CoverLayout
      title="Тавтай морилно уу"
      description="Та өөрийн и-мейл хаягаа баталгаажуулна уу !"
      image={curved9}
    >
     {
      load?
      <div className="bg-blue-600 rounded py-2 px-4 text-center text-white hover:bg-blue-700 cursor-pointer">
      Уншиж байна...</div>
      :
      <div onClick={clickSubmit} className="bg-blue-600 rounded py-2 px-4 text-center text-white hover:bg-blue-700 cursor-pointer">
      Баталгаажуулах</div>
     }
    </CoverLayout>
  );
  
}

export default Activate;
