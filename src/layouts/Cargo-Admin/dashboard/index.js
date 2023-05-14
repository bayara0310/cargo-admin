

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
import { useEffect, useState } from "react";
import { isAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import axios from "axios";
import { cargoOrdersUri } from "url/url";

function Dashboard() {
  const navigate = useNavigate();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [loading, setLoading] = useState(false);

  const [req, setReq] = useState();
  const [app, setApp] = useState();
  const [confirm, setConfirm] = useState();
  const [came, setCame] = useState();

  useEffect(() => {
    if(!isAuth()){
      navigate("/authentication/sign-in")
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try{
      const req = await axios.post(cargoOrdersUri, {id:isAuth()?.cargoid, type: 2});
      const app = await axios.post(cargoOrdersUri, {id:isAuth()?.cargoid, type: 3});
      const confirm = await axios.post(cargoOrdersUri, {id:isAuth()?.cargoid, type: 4});
      const came = await axios.post(cargoOrdersUri, {id:isAuth()?.cargoid, type: 5});

      setReq(req.data.orders.length)
      setApp(app.data.orders.length)
      setConfirm(confirm.data.orders.length)
      setCame(came.data.orders.length)
      
      setLoading(false);
    }catch(err){
      setLoading(false);
      console.log(err)
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "Хүлээгдэж байгаа" }}
                  count={req !== undefined && req !== null ? req : <Spin/>}
                  percentage={{ color: "success", text: "Ширхэг" }}
                  icon={{ color: "info", component: "paid" }}
                />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Баталгаажсан" }}
                count={app !== undefined && app !== null ? app : <Spin/>}
                percentage={{ color: "success", text: "Ширхэг" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Хүлээж авсан" }}
                count={confirm !== undefined && confirm !== null ? confirm : <Spin/>}
                percentage={{ color: "success", text: "Ширхэг" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Ирсэн" }}
                count={came !== undefined && came !== null ? came : <Spin/>}
                percentage={{ color: "success", text: "Ширхэг" }}
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
                title="Орлогын статистик"
                description={
                  <>
                    (<strong>+23%</strong>) Орлого
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Нийт захиалгууд"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      Сүүлийн 2 жилийн{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                      захиалгуудын статистик
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
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
