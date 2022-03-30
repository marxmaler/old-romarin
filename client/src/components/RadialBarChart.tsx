import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  border: 0.5px rgba(0, 0, 0, 0.2) solid;
  border-radius: 20px;
  margin-top: 20px;
`;

interface IPieChartProps {
  labels: string;
  series: number;
}

const RadialBarChart = ({ labels, series }: IPieChartProps) => {
  const options: ApexOptions = {
    series: [series],
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
    labels: [labels],
  };
  return (
    <ChartContainer>
      <ReactApexChart
        options={options}
        type="radialBar"
        series={[series]}
        width={380}
      />
    </ChartContainer>
  );
};

export default RadialBarChart;
