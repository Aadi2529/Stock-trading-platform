import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#ffffff",
      },
    },
    title: {
      display: true,
      text: "Portfolio Distribution",
      color: "#ffffff",
    },
  },
  scales: {
    x: {
      ticks: { color: "#ffffff" },
    },
    y: {
      ticks: { color: "#ffffff" },
    },
  },
};

export function VerticalGraph({ data }) {
  return <Bar options={options} data={data} />;
}