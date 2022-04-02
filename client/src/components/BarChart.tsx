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

const BarChart = ({ labels, series }: IChartProps) => {
  const seriesWithLabels = [
    {
      name: "단어 갯수",
      data: series,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "단어별 복습 현황",
      align: "center",
      style: { fontSize: "18px", color: "rgba(109, 95, 179, 1)" },
    },
    colors: ["rgba(156, 136, 255,1)"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 10,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "개";
      },
      offsetY: 0,
      style: {
        fontSize: "14px",
        colors: ["white"],
      },
    },
    // stroke: {
    //   show: true,
    //   width: 2,
    //   colors: ["transparent"],
    // },
    xaxis: {
      categories: labels,
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      show: false,
    },

    fill: {
      opacity: 0.8,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}개`;
        },
      },
    },
  };
  return (
    <ChartContainer>
      <ReactApexChart
        options={options}
        type="bar"
        series={seriesWithLabels}
        width={380}
      />
    </ChartContainer>
  );
};

export default BarChart;