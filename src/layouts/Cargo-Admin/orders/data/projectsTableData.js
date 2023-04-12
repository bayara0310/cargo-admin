/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { cargoall } from "url/url";

function Completion({ value, color }) {

  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

// const [my, setMy] = useState([])

// useEffect(() => {
//   fetchDataa();
// },[]);

// const fetchDataa = useCallback(async () => {
//   try{
//     const res= await axios.get(cargoall)
//     setMy(res.data)
//     console.log(res.data)

//   }catch(err){
//     console.log(err)
//   }
// });

const projectsTableData = {
  columns: [
    { name: "project", align: "left" },
    { name: "budget", align: "left" },
    { name: "status", align: "left" },
    { name: "completion", align: "center" },
    { name: "action", align: "center" },
  ],
  rows: [
    {
      project: [logoInvesion, "Invesion"],
      budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $5,000
        </SoftTypography>
      ),
      status: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          done
        </SoftTypography>
      ),
      completion: <Completion value={100} color="success" />,
      action,
    },
  ],
};

export default projectsTableData;
