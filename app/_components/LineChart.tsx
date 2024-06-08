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
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

// point 2
export const options: ChartOptions<"line"> = {
  interaction: {
    mode: "y",
  },
};

// point 3
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const datasets = [];
datasets.push({ data: [1, 2, 3, 4, 5, 6, 7] });
export const data: ChartData<"line"> = {
  labels,
  datasets,
};

// point 4
export default function LineChart(): JSX.Element {
  return <Line options={options} data={data} />;
}
