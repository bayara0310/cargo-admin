

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";
import {TbEdit} from 'react-icons/tb'
import {BiMessageDetail, BiPhone, BiUserPin} from 'react-icons/bi'
import { useEffect, useState } from "react";
import { isAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import SiteAdd from "components/Modals/Profile/siteadd";
import axios from "axios";
import { allsites } from "url/url";
import CountryAdd from "components/Modals/Profile/countryadd";
import { countrylists } from "url/url";
import RailAdd from "components/Modals/Profile/railadd";

function Overview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const[sites, setSites]= useState([])
  const[countrys, setCountrys]= useState([])
  const[rails, setRails]= useState([])
  
  useEffect(() => {
    if(!isAuth()){
      return navigate("/authentication/sign-in")
    }
    submit();
  }, []);


  const submit = async () => {
    setLoading(true)
     try{
        const res = await axios.get(allsites)
        const ress = await axios.get(countrylists)
        setCountrys(ress.data);
        setSites(res.data)

        setLoading(false)
     }catch(err){
         console.log(err)
         setLoading(false)
     }
}

  return (
    <DashboardLayout>
      <Header />
        <div className="grid grid-cols-2 gap-4 mt-4 mb-8">

          <div className="grid col-span-1">
            <div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-sm">Бүх вебсайтууд</h1>
                <SiteAdd/>
              </div>
              <div>
                {
                  sites.map((i, index) => {
                    return(
                      <div className="" key={index}>
                        <div className="bg-gray-100 mt-2 p-2 shadow rounded flex items-center">
                          <img className="h-8" src={i.logo}/>
                          <h1 className="text-sm ml-4">{i.name}</h1>
                          <h1 className="text-sm ml-4">{i.link}</h1>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            </div>
          </div>
          <div className="grid col-span-1">
            <div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-sm">Бүх улсууд</h1>
                <CountryAdd/>
              </div>
              <div>
                {
                  countrys.map((i, index) => {
                    return(
                      <div className="" key={index}>
                        <div className="bg-gray-100 mt-2 p-2 shadow rounded flex items-center ">
                          <img className="h-6 w-10" src={i.logo}/>
                          <h1 className="text-sm ml-4">{i.name}</h1>
                          <h1 className="text-sm ml-4">{i.sname}</h1>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            </div>
          </div>

          {/* <div className="grid col-span-1">
            <div>
            <div className="w-full bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-sm">Тээвэрлэлтийн төрлүүд</h1>
                <RailAdd/>
              </div>
              <div>
                {
                  countrys.map((i, index) => {
                    return(
                      <div className="" key={index}>
                        <div className="bg-gray-100 mt-2 p-2 shadow rounded flex items-center ">
                          <img className="h-6 w-10" src={i.logo}/>
                          <h1 className="text-sm ml-4">{i.name}</h1>
                          <h1 className="text-sm ml-4">{i.sname}</h1>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            </div>
          </div> */}

        </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
