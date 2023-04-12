
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import Table from "examples/Tables/Table";

// Data
import projectsTableData from "layouts/request/data/projectsTableData";
import { useEffect, useState } from "react";
import axios from "axios";
import { cargostatus } from "url/url";
import { Avatar } from "@mui/material";
import SoftBadge from "components/SoftBadge";
import MoreModal from "components/Modals/CargoRequiest/more";

function Request() {
  const { columns: prCols, rows: prRows } = projectsTableData;
  console.log(prRows)
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

const loadProfile = async () => {
  try{
    const res = await axios.post(cargostatus, {cargo_status: "REQUIESTED"});
    setCargos(res.data.data);
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
            <SoftTypography variant="h6">Хүсэлт явуулсан каргонууд</SoftTypography>
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

              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500 text-gray-500">
                          <tr>
                            <th scope="col" className="px-6 py-4"> Карго нэр</th>
                            <th scope="col" className="px-6 py-4">Холбоо барих</th>
                            <th scope="col" className="px-6 py-4">Хаяг</th>
                            <th scope="col" className="px-6 py-4">Төлөв</th>
                            <th scope="col" className="px-6 py-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            cargos.map((item, index) => {
                              return(
                              <tr className="border-b dark:border-neutral-500" key={index}>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <div className="flex items-center">
                                    <Avatar src={item.logo} className="border border-gray-300"/> 
                                    <div className="ml-2">
                                      <h1 className="font-semibold">{item.cargo_name}</h1>
                                      <p className="">{item.phone_number}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                  <h1>{item.email}</h1>
                                </td>
                                <td className=" px-6 py-4 text-sm" >
                                  <h1 className="whitespace-normal">{item.address}</h1>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <SoftBadge variant="gradient" badgeContent="хүлээгдэж буй" color="secondary" size="xs" container/>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 z-50">
                                  <MoreModal id={item._id}/>
                                </td>
                              </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
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

export default Request;
