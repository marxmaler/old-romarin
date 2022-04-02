import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { IChartProps } from "../interfaces";

const ChartContainer = styled.div`
  border: 0.5px rgba(0, 0, 0, 0.2) solid;
  border-radius: 20px;
  margin-top: 20px;
  padding-top: 20px;
`;

const PieChart = ({ labels, series }: IChartProps) => {
  const options: ApexOptions = {
    series: [{ data: series }],
    chart: {
      width: 380,
      type: "pie",
    },
    labels,
    colors: [
      "#041c6c",
      "#c3041b",
      "#9b59b6",
      "#fccc04",
      "#ffcada",
      "#9b59b6",
      "#27ae60",
    ],
    title: {
      text: "누적 학습 단어 비율",
      align: "center",
      style: { fontSize: "18px", color: "rgba(109, 95, 179, 1)" },
    },
    dataLabels: {
      offsetY: 0,
      style: {
        fontSize: "16px",
        fontWeight: 900,
        colors: ["rgba(236, 240, 241,1.0)"],
      },
    },
    fill: {
      type: "image",
      opacity: 1,
      image: {
        src: [
          require("../images/En_flag.png"),
          require("../images/Es_flag.png"),
          require("../images/Fr_flag.png"),
          require("../images/De_flag.png"),
          require("../images/Jp_flag.png"),
          require("../images/Ch_flag.png"),
          require("../images/Ru_flag.png"),
        ],
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <ChartContainer>
      <ReactApexChart
        type="pie"
        options={options}
        series={series}
        width={380}
      />
    </ChartContainer>
  );
};

export default PieChart;
