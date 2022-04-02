import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { IChartProps, ILanguageWords } from "../interfaces";

const ChartContainer = styled.div`
  border: 0.5px rgba(0, 0, 0, 0.2) solid;
  border-radius: 20px;
  margin-top: 20px;
  padding-top: 20px;
`;

interface IHorizontalBarChartProps {
  labels: string[];
  languageWords: ILanguageWords;
  selectedMenu: string;
}

const HorizontalBarChart = ({
  labels,
  languageWords,
  selectedMenu,
}: IHorizontalBarChartProps) => {
  const languageWordAvgArr: number[] = [];
  const langs = Object.keys(languageWords);
  langs.forEach((lang) => {
    const wordsCnt = languageWords[lang].length;
    const avg = Math.round(wordsCnt / 8);
    languageWordAvgArr.push(avg);
  });

  const seriesWithLabels = [
    {
      name: "단어 갯수",
      data: languageWordAvgArr,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: selectedMenu,
      align: "center",
      style: { fontSize: "18px", color: "rgba(109, 95, 179, 1)" },
    },
    colors: ["rgba(156, 136, 255,1)"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "개";
      },
      offsetX: 10,
      style: {
        fontWeight: 500,
        fontSize: "14px",
        colors: ["rgba(245, 243, 255, 1)"],
      },
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      show: true,
    },

    fill: {
      opacity: 0.8,
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

export default HorizontalBarChart;
