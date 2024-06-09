"use client";
// point 1
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
);

// point 2
export const options: ChartOptions<"line"> = {
  interaction: {
    mode: "y",
  },
  plugins: {
    title: {
      display: true,
      text: "title",
    },
  },
};

// point 3
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const datasets = [
  { data: [1, 2, 3, 4, 5, 6, 7], label: "hoge" },
  { data: [9, 4, 5, 6, 1, 3, 5], label: "fuga" },
];
export const data: ChartData<"line"> = {
  labels,
  datasets,
};

// point 4
export default function LineChart(): JSX.Element {
  return <Line options={options} data={data} />;
}
