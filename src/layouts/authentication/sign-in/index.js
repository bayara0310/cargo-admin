
import { useState } from "react";

// react-router-dom 
import { Link, useNavigate } from "react-router-dom";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/cargo.jpg";
import { authenticate, isAuth } from "context/AuthContext";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [data, setData] = useState({email:"", password:""});

  const onSubmit = values => {
    setLoading(true)
    const email = data.email
    const password = data.password
    axios({
      method: 'POST',
      url: `http://localhost:8000/api/admin/signin`,
      data: { email, password}
    })
    .then(response=>{
      authenticate(response, () => {
        isAuth() && isAuth().role == 'Admin' || isAuth().role == 'Adminn' ? navigate('/dashboard') : alert("Админ биш байна.");
        setLoading(false)
      });
    })
    .catch(error => {
      setLoading(false)
      console.log('signup error', error.response.data.error)
      setMessage(error.response.data.error);
      setLoading(false)

    })
  }

  return (
    <CoverLayout
      title="Тавтай морилно уу"
      description="Та өөрийн и-мейл хаяг, нууц үгийг хийж нэвтэрнэ үү !"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              И-мейл хаяг
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" onChange={e=> setData({...data, email:e.target.value})} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Нууц үг
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" onChange={e=> setData({...data, password:e.target.value})} />
        </SoftBox>
        {
          message?
          <div>
          {message}          
        </div>
        :
        ""
        }
        <SoftBox mt={4} mb={1}>
          {
            loading?
            <SoftButton variant="gradient" color="info" fullWidth>
              <h1 className="animate-bounce">Шалгаж байна...</h1>
            </SoftButton>
            :
            <SoftButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
              Нэвтрэх
            </SoftButton>
          }
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Таньд хаяг байхгүй байна уу {" ? "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Бүртгүүлэх
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
