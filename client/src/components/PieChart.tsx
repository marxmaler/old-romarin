import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  border: 0.5px rgba(0, 0, 0, 0.2) solid;
  border-radius: 20px;
  margin-top: 20px;
`;

interface IPieChartProps {
  labels: string[];
  series: number[];
}

const PieChart = ({ labels, series }: IPieChartProps) => {
  //   const series = [44, 55, 13, 43, 22];
  const options: ApexOptions = {
    chart: {
      width: 380,
      type: "pie",
    },

    labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <ChartContainer>
      <ReactApexChart
        options={options}
        type="pie"
        series={series}
        width={380}
      />
    </ChartContainer>
  );
};

export default PieChart;
