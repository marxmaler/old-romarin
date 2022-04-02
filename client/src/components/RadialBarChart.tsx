import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { IChartProps } from "../interfaces";

const ChartContainer = styled.div`
  border: 0.5px rgba(0, 0, 0, 0.2) solid;
  border-radius: 20px;
  margin-top: 20px;
`;

const RadialBarChart = ({ labels, series }: IChartProps) => {
  const options: ApexOptions = {
    series: [{ data: series }],
    chart: {
      height: 350,
      type: "radialBar",
    },
    colors: ["rgba(156, 136, 255,1)"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
    labels: labels,
    stroke: {
      lineCap: "round",
    },
  };
  return (
    <ChartContainer>
      <ReactApexChart
        type="radialBar"
        options={options}
        series={series}
        width={380}
      />
    </ChartContainer>
  );
};

export default RadialBarChart;
