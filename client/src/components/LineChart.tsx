import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { ILanguageWordsCnt } from "../interfaces";
import { ChartContainer } from "../styles/chartStyle";
import { languagesInKo } from "../util/language";

interface ILineChartProp {
  labels: string[];
  selectedMenu: string;
  weeklyWordsCntAvg: number;
  languageWordsCnt: ILanguageWordsCnt;
}
const LineChart = ({
  labels,
  selectedMenu,
  languageWordsCnt,
  weeklyWordsCntAvg,
}: ILineChartProp) => {
  //   console.log(languageWordsCnt);

  const series = [
    {
      name: languagesInKo[0],
      type: "line",
      data: languageWordsCnt.En,
    },
    {
      name: languagesInKo[1],
      type: "line",
      data: languageWordsCnt.Es,
    },
    {
      name: languagesInKo[2],
      type: "line",
      data: languageWordsCnt.Fr,
    },
    {
      name: languagesInKo[3],
      type: "line",
      data: languageWordsCnt.De,
    },
    {
      name: languagesInKo[4],
      type: "line",
      data: languageWordsCnt.Jp,
    },
    {
      name: languagesInKo[5],
      type: "line",
      data: languageWordsCnt.Ch,
    },
    {
      name: languagesInKo[6],
      type: "line",
      data: languageWordsCnt.Ru,
    },
    {
      name: "일일 평균",
      type: "area",
      data: [
        weeklyWordsCntAvg,
        weeklyWordsCntAvg,
        weeklyWordsCntAvg,
        weeklyWordsCntAvg,
        weeklyWordsCntAvg,
        weeklyWordsCntAvg,
        weeklyWordsCntAvg,
        weeklyWordsCntAvg,
      ],
    },
  ];

  const options: ApexOptions = {
    series,
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    colors: [
      "#041c6c",
      "#c3041b",
      "#9b59b6",
      "#fccc04",
      "#ffcada",
      "#f46d11",
      "#27ae60",
      "rgba(225, 219, 255, 1)",
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [4, 4, 4, 4, 4, 4, 4, 1],
    },
    fill: {
      type: ["solid"],
      opacity: [1, 1, 1, 1, 1, 1, 1, 0.3],
    },
    title: {
      text: selectedMenu,
      align: "center",
      style: { fontSize: "18px", color: "rgba(78, 68, 128, 1)" },
    },
    markers: {
      size: [1, 1, 1, 1, 1, 1, 1, 0],
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: labels,
    },
    tooltip: {
      shared: true,
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
        type="line"
        options={options}
        series={series}
        width={380}
      />
    </ChartContainer>
  );
};

export default LineChart;
