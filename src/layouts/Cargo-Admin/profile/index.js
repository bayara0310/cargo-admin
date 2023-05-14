

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/Cargo-Admin/profile/components/Header";
import {TbEdit} from 'react-icons/tb'
import {BiMessageDetail, BiPhone, BiUserPin} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuth } from "context/AuthContext";
import { cargoone } from "url/url";
import axios from "axios";
import { Button, Checkbox, message } from "antd";
import { allsites } from "url/url";
import { addallsites } from "url/url";
import { countrylists } from "url/url";
import { cargoNationuri } from "url/url";

function Overview() {
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);
  const[cargo, setCargo] = useState({})
  const[sites, setSites] = useState([])
  const[country, setCountry] = useState([])
  const [checkedValue, setValue] = useState([]);
  const [checkedCountry, setValueCountry] = useState([]);
  
  useEffect(() => {
    if(!isAuth()){
      navigate("/authentication/sign-in")
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try{
      const res = await axios.get(cargoone + isAuth()?.cargoid);
      const ress = await axios.get(allsites);
      const resss = await axios.get(countrylists);
      setCountry(resss.data)
      setSites(ress.data);
      setCargo(res.data);

      setLoading(false);
    }catch(err){
      setLoading(false);
      console.log(err)
    }
  }

  const subcountry = async () => {
    console.log(checkedCountry)
    try{
      const res = await axios.patch(cargoNationuri + isAuth()?.cargoid, {nation:checkedCountry})
      console.log(res.data)
      message.success(res.data?.message)
    }catch(err){
      console.log(err);
    }
  }

  const sub = async () => {
    try{
      const res = await axios.patch(addallsites + isAuth()?.cargoid, {type:checkedValue})
      console.log(res.data)
      message.success(res.data?.message)
    }catch(err){
      console.log(err);
    }
  }

  function handleChange(event){
    const {value, checked} = event.target
      if(checked){
        setValue(pre => [...pre, value])
      }else{
        setValue(pre => {
          return [...pre.filter(skill => skill!==value)];
        })
      }
  }
  function handleChangeCountry(event){
    const {value, checked} = event.target
      if(checked){
        setValueCountry(pre => [...pre, value])
      }else{
        setValueCountry(pre => {
          return [...pre.filter(skill => skill!==value)];
        })
      }
  }
  

  return (
    <DashboardLayout>
      <Header data={cargo}/>
        <div className="grid grid-cols-3 gap-4 mt-4 mb-8">

          <div className="grid col-span-1">
            <div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-8">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold">Ерөнхий мэдээлэл</h1>
                  <TbEdit className="cursor-pointer"/>
                </div>
                <div className="mt-2">
                  <p className="text-sm">{cargo?.overview}</p>
                </div>
                <div className="mt-4 ml-2 w-full">
                  <div className="">
                      <div className="flex items-center">
                        <BiUserPin/>
                        <h1 className="ml-4 text-xs">Компани нэр *</h1>
                        <h1 className="text-base ml-4">{cargo?.cargo_name}</h1>
                      </div>
                      <div className="flex items-center mt-2">
                        <BiMessageDetail/>
                        <h1 className="ml-4 text-xs">И-мейл хаяг *</h1>
                        <h1 className="text-base ml-4">{cargo?.email}</h1>
                      </div>
                      <div className="flex items-center mt-2">
                        <BiPhone/>
                        <h1 className="ml-4 text-xs">Утасны дугаар *</h1>
                        <h1 className="text-base ml-4">{cargo?.phone_number}</h1>
                      </div>
                      <div className="flex items-center mt-2">
                        <BiPhone/>
                        <h1 className="ml-4 text-xs">Вебсайт *</h1>
                        <h1 className="text-base ml-4">{cargo?.website}</h1>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="grid col-span-1">
            <div>
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-4">
                  <h1 className="text-sm mb-4">Захиалга авдаг Улсууд</h1>
                 {
                  country.map((i, index) => {
                   return(
                    <div className="flex items-center ml-4 mt-1" key={index}>

                      {
                        cargo.nation?.includes(i._id) ?
                        <Checkbox checked value={i._id} onChange={handleChangeCountry}/>
                        :
                        <Checkbox value={i._id} onChange={handleChangeCountry}/>
                      }

                      <div className="w-full flex items-center">
                        <img className="h-4 ml-2" src={i.logo}/>
                        <h1 className="text-sm ml-2">{i.name}</h1>
                      </div>
                    </div>
                   )
                  })
                 }
                  <div className="flex items-end justify-end mt-4">
                    <Button className="bg-blue-500 text-white" onClick={subcountry}>Өөрчлөлтийг хадгалах</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid col-span-1">
            <div>
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-4">
                  <h1 className="text-sm mb-4">Захиалга авдаг вебсайтууд</h1>
                 {
                  sites.map((i, index) => {
                   return(
                    <div className="flex items-center ml-4 mt-1" key={index}>

                      {
                        cargo.sites?.includes(i._id) ?
                        <Checkbox checked value={i._id} onChange={handleChange}/>
                        :
                        <Checkbox value={i._id} onChange={handleChange}/>
                      }

                      <div className="w-full flex items-center">
                        <img className="h-4 ml-2" src={i.logo}/>
                        <h1 className="text-sm ml-2">{i.name}</h1>
                        <h1 className="text-xs ml-2 bg-gray-100 text-center rounded py-1 px-2">{i.link}</h1>
                      </div>
                    </div>
                   )
                  })
                 }
                  <div className="flex items-end justify-end mt-4">
                    <Button className="bg-blue-500 text-white" onClick={sub}>Өөрчлөлтийг хадгалах</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
       
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
