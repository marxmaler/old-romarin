import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  border: 0.5px rgba(0, 0, 0, 0.2) solid;
  border-radius: 20px;
  margin-top: 20px;
`;

interface IBarChartProps {
  labels: string[];
  series: number[];
}

const BarChart = ({ labels, series }: IBarChartProps) => {
  const options: ApexOptions = {
    series: [
      {
        name: labels[0],
        data: [series[0]],
      },
      {
        name: labels[1],
        data: [series[1]],
      },
      {
        name: labels[2],
        data: [series[2]],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      title: {
        text: "개",
      },
    },
    fill: {
      opacity: 1,
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
        series={series}
        width={380}
      />
    </ChartContainer>
  );
};

export default BarChart;
