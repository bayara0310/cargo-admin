
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import SoftBadge from "components/SoftBadge";
import MoreOrder from "components/Modals/CargoAdmin/order";
import { cargoOrdersUri } from "url/url";
import { isAuth } from "context/AuthContext";
import moment from "moment/moment";
import { BARAA } from "url/types";
import empty from "../../../assets/zurag/empty.png"
import { cargoOrdersUrisearch } from "url/url";

function Orders() {
  const [search, setSearch] = useState(null)
  const [cargos, setCargos] = useState([]);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    loadProfile();
  }, [tab]);

  const loadProfile = async () => {
    try{
      const res = await axios.post(cargoOrdersUri, {id:isAuth()?.cargoid, type: tab});
      setCargos(res.data.order);
    }catch(err){
      console.log(err)
    }
  }
  const searchBar = async () => {
    try{
      const res = await axios.post(cargoOrdersUrisearch, {id:isAuth()?.cargoid, search: search});
      setCargos(res.data.order);
    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
    <DashboardLayout>
      <DashboardNavbar/>
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Бүх захиалгууд</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            {/* <Table columns={prCols} rows={prRows} /> */}
            <div className="mx-6">
              <div className="flex">

                <div className={tab===1? "bg-blue-500 rounded px-4 py-1 text-sm text-white cursor-pointer hover:bg-blue-600":
                 "bg-white rounded px-4 py-1 text-sm text-black cursor-pointer hover:text-white hover:bg-blue-600"}
                 onClick={e=> setTab(1)}
                 >Бүгд</div>
                 
                <div className={tab===2? "bg-blue-500 rounded px-4 py-1 text-sm text-white cursor-pointer hover:bg-blue-600 ml-2":
                 "bg-white rounded px-4 py-1 text-sm text-black cursor-pointer hover:text-white hover:bg-blue-600 ml-2"}
                 onClick={e=> setTab(2)}
                 >Хүлээгдэж байгаа</div>
                 
                <div className={tab===3? "bg-blue-500 rounded px-4 py-1 text-sm text-white cursor-pointer hover:bg-blue-600 ml-2":
                 "bg-white rounded px-4 py-1 text-sm text-black cursor-pointer hover:text-white hover:bg-blue-600 ml-2"}
                 onClick={e=> setTab(3)}
                 >Баталгаажсан</div>

                <div className={tab===4? "bg-blue-500 rounded px-4 py-1 text-sm text-white cursor-pointer hover:bg-blue-600 ml-2":
                 "bg-white rounded px-4 py-1 text-sm text-black cursor-pointer hover:text-white hover:bg-blue-600 ml-2"}
                 onClick={e=> setTab(4)}
                 >Хүлээж авсан</div>

                 <div className={tab===5? "bg-blue-500 rounded px-4 py-1 text-sm text-white cursor-pointer hover:bg-blue-600 ml-2":
                 "bg-white rounded px-4 py-1 text-sm text-black cursor-pointer hover:text-white hover:bg-blue-600 ml-2"}
                 onClick={e=> setTab(5)}
                 >Ирсэн</div>

                <div className={tab===6? "bg-blue-500 rounded px-4 py-1 text-sm text-white cursor-pointer hover:bg-blue-600 ml-2":
                 "bg-white rounded px-4 py-1 text-sm text-black cursor-pointer hover:text-white hover:bg-blue-600 ml-2"}
                 onClick={e=> setTab(6)}
                 >Хүлээлгэж өгсөн</div>

              </div>
            </div>
            <div className="mx-6 my-2 mt-6 flex items-center">
              <input onChange={ e=> setSearch(e.target.value)} value={search} placeholder="Хайлт хийх" className="text-sm ring-1 rounded py-1 px-2 w-full outline-none focus:ring-2 hover:ring-blue-600"/>
              <h1 onClick={e=> setSearch("")} className="mx-2 text-sm cursor-pointer hover:opacity-50">x</h1>
              <div onClick={searchBar} className="text-sm bg-blue-500 rounded text-white mx-2 px-4 py-1 cursor-pointer hover:bg-blue-600">Хайх</div>
            </div>

              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500 text-gray-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">Захиалгын төрөл</th>
                            <th scope="col" className="px-6 py-4">Линк</th>
                            <th scope="col" className="px-6 py-4">Нэгж үнэ</th>
                            <th scope="col" className="px-6 py-4">Тоо ширхэг</th>
                            <th scope="col" className="px-6 py-4">Огноо</th>
                            <th scope="col" className="px-6 py-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            cargos.map((item, index) => {
                              return(
                              <tr className="border-b dark:border-neutral-500" key={index}>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <h1 className="font-semibold">{item.type}</h1>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                  <h1>{item.link}</h1>
                                </td>
                                <td className=" px-6 py-4 text-sm" >
                                  <h1 className="whitespace-normal">{item.price}</h1>
                                </td>
                                <td className=" px-6 py-4 text-sm" >
                                  <h1 className="whitespace-normal">{item.number}</h1>
                                </td>
                                <td className=" px-6 py-4 text-sm" >
                                  <h1 className="whitespace-normal">{moment(item.date).format('l')}</h1>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {
                                    item?.status === BARAA.REGISTERED&&
                                    <SoftBadge variant="gradient" badgeContent="Хүлээгдэж буй" color="secondary" size="xs" container/>
                                  }
                                  {
                                    item?.status === BARAA.APPROVED&&
                                    <SoftBadge variant="gradient" badgeContent="Баталгаажсан" color="light" size="xs" container/>
                                  }
                                  {
                                    item?.status === BARAA.RECEIVED&&
                                    <SoftBadge variant="gradient" badgeContent="Хүлээж авсан" color="warning" size="xs" container/>
                                  }
                                  {
                                    item?.status === BARAA.CAME&&
                                    <SoftBadge variant="gradient" badgeContent="Ирсэн" color="success" size="xs" container/>
                                  }
                                  {
                                    item?.status === BARAA.CONFIRM&&
                                    <SoftBadge variant="gradient" badgeContent="Хүлээлгэж өгсөн" color="primary" size="xs" container/>
                                  }
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 z-50">
                                  <MoreOrder id={item._id}/>
                                </td>
                              </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                      {
                        cargos.length === 0 &&
                        <div className="grid justify-center p-4">
                          <div className="flex justify-center">
                            <img src={empty}/>
                          </div>
                          <h1 className="text-sm mt-4">Таньд энэ түвшний бараа одоогоор байхгүй байна !</h1>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>

          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
    </>
  );
}

export default Orders;
