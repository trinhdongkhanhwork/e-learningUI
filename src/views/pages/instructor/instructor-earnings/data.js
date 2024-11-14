const earnigsChart = {
  series: [
    {
      name: "Earnings",
      data: [25, 40, 30, 55, 25, 35, 25, 50, 20, 40, 20, 50],
    },
  ],
  earnChart: {
    chart: {
      height: 273,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    colors: ["#FF4667"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      min: 10,
      max: 60,
      tickAmount: 5,
      labels: {
        formatter: (val) => {
          return val / 1 + "K";
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  },
};
export { earnigsChart };
