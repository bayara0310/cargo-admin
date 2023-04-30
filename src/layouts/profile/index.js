

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";
import {TbEdit} from 'react-icons/tb'
import {BiMessageDetail, BiPhone, BiUserPin} from 'react-icons/bi'
import { useEffect } from "react";
import { isAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!isAuth()){
      navigate("/authentication/sign-in")
    }
  }, []);

  return (
    <DashboardLayout>
      <Header />
        <div className="grid grid-cols-3 gap-4 mt-4 mb-8">
          <div className="grid col-span-1">
            <div className="w-full bg-white rounded-2xl shadow-lg p-8">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold">Ерөнхий мэдээлэл</h1>
                  <TbEdit className="cursor-pointer"/>
                </div>
                <div className="mt-2">
                  <p className="text-sm">In financial accounting, a statement refers to a financial report that summarizes the financial activities and position of an organization.</p>
                </div>
                <div className="mt-4 ml-2 w-full">
                  <div className="">
                      <div className="flex items-center">
                        <BiUserPin/>
                        <h1 className="ml-4 text-xs">Нэр *</h1>
                        <h1 className="text-base ml-4">Аригун ххк</h1>
                      </div>
                      <div className="flex items-center mt-2">
                        <BiMessageDetail/>
                        <h1 className="ml-4 text-xs">И-мейл хаяг *</h1>
                        <h1 className="text-base ml-4">bayarsuren0310@gmail.com</h1>
                      </div>
                      <div className="flex items-center mt-2">
                        <BiPhone/>
                        <h1 className="ml-4 text-xs">Утасны дугаар *</h1>
                        <h1 className="text-base ml-4">85208520</h1>
                      </div>
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
