

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import Projects from "layouts/Cargo-Admin/dashboard/components/Projects";
import OrderOverview from "layouts/Cargo-Admin/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/Cargo-Admin/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/Cargo-Admin/dashboard/data/gradientLineChartData";
import { useEffect } from "react";
import { isAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';

function Dashboard() {
  const navigate = useNavigate();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const options = [
    {value: "aaa"},
    {value: "ss"},
    {value: "ff"}
  ];

  useEffect(() => {
    if(!isAuth()){
      navigate("/authentication/sign-in")
    }
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Орлого" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Шинэ хэрэглэгч" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) Сүүлийн 7 хоногт
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
       <div className="grid grid-cols-2">

        <div className="grid col-span-1">
          <div className="bg-white shadow-lg rounded">
            <div className="m-4">
              <h1 className="text-lg ">Захиалга авдаг улсууд</h1>
            </div>
            <div className="m-4">
              <Select
                mode="tags"
                style={{
                  width: '100%',
                }}
                placeholder="Tags Mode"
                onChange={handleChange}
                options={options}
              />
            </div>
          </div>
        </div>

        <div className="grid col-span-1 mx-4">
          <div className="bg-white shadow-lg rounded">
            ss
          </div>
        </div>

       </div>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
