
const reportsBarChartData = {
  chart: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { data: [45000, 15000, 35000, 50000, 48000, 150000, 100000, 80000, 65000, 50500, 60000, 12000], label: "Орлого"},
  },
  items: [
    {
      icon: { color: "primary", component: "library_books" },
      label: "users",
      progress: { content: "36K", percentage: 60 },
    },
    {
      icon: { color: "info", component: "touch_app" },
      label: "clicks",
      progress: { content: "2M", percentage: 90 },
    },
    {
      icon: { color: "warning", component: "payment" },
      label: "sales",
      progress: { content: "$435", percentage: 30 },
    },
    {
      icon: { color: "error", component: "extension" },
      label: "items",
      progress: { content: "43", percentage: 50 },
    },
  ],
};

export default reportsBarChartData;
