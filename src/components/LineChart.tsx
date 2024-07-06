import { Line } from "react-chartjs-2";
import { ModuleHistoryItem } from "../types";
import {
  ChartOptions,
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import AnnotationPlugin from "chartjs-plugin-annotation";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  AnnotationPlugin,
  Filler
);

const LineChart = ({
  small,
  data,
  safeTemperatureRanges,
}: {
  small?: boolean;
  data: ModuleHistoryItem[];
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
}) => {
  const transformedData = {
    labels: data.map((dp) => dp.timestamp),
    datasets: [
      {
        label: "Temperature",
        data: data.map((dp) => dp.temperature),
        borderColor: "#33D999",
        tension: 0.1,
        fill: {
          target: "origin",
          above: "#33D99933",
        },
        pointRadius: 5,
      },
    ],
  };

  const options: Partial<ChartOptions<"line">> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
          text: "Time",
        },
        ticks: {
          display: !small,
          autoSkip: true,
          maxRotation: 0,
        },
      },
      y: {
        title: {
          display: false,
          text: "Temperature",
        },
        ticks: {
          callback: (value: any) => {
            return value + "°C";
          },
        },
        min: safeTemperatureRanges.min,
        max: safeTemperatureRanges.max,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Temperature Over Time",
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
  };

  return <Line data={transformedData} options={options} />;
};

export default LineChart;
