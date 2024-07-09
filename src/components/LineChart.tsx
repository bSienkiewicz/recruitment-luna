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
  Tooltip,
  InteractionMode,
} from "chart.js";
import AnnotationPlugin from "chartjs-plugin-annotation";
import dayjs from "dayjs";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  AnnotationPlugin,
  Filler,
  Tooltip
);

interface LineChartProps {
  small?: boolean;
  data: ModuleHistoryItem[];
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
  targetTemperature: number;
  realTimeData?: ModuleHistoryItem[];
  showRealTime?: boolean;
  showSafeZone?: boolean;
}
const LineChart = ({
  small,
  data,
  safeTemperatureRanges,
  targetTemperature,
  realTimeData,
  showRealTime,
  showSafeZone,
}: LineChartProps) => {

  
  // Format ISO dates to human readable
  const formattedData =
    showRealTime && realTimeData
      ? realTimeData.map((item) => ({
          ...item,
          date: dayjs(item.timestamp).format("MMM DD, YYYY"),
          time: dayjs(item.timestamp).format("HH:mm"),
        }))
      : data.map((item) => ({
          ...item,
          date: dayjs(item.timestamp).format("MMM DD, YYYY"),
          time: dayjs(item.timestamp).format("HH:mm"),
        }));

  // Chart setting and options
  const transformedData = {
    labels: formattedData.map((dp) => dp.timestamp),
    datasets: [
      {
        label: "Temperature",
        data: formattedData.map((dp) => dp.temperature),
        borderColor: "#33D999",
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(51, 217, 153, 0)");
          gradient.addColorStop(1, "rgba(51, 217, 153, 0.5)");
          return gradient;
        },
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options: Partial<ChartOptions<"line">> = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
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
          callback: function (_, index) {
            const datapoint = formattedData[index];
            return [datapoint.date, datapoint.time];
          },
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
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index" as InteractionMode,
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1) + "°C";
            }
            return label;
          },
          title: function (tooltipItems) {
            if (tooltipItems.length > 0) {
              const index = tooltipItems[0].dataIndex;
              const datapoint = formattedData[index];
              return `${datapoint.date} ${datapoint.time}`;
            }
            return "";
          },
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: targetTemperature,
            yMax: targetTemperature,
            borderColor: "#2E8B5760",
            borderWidth: 2,
            display: showSafeZone,
          },
          box1: {
            type: "box",
            yMin: safeTemperatureRanges.warnMin,
            yMax: safeTemperatureRanges.warnMax,
            backgroundColor: "#2E8B5720", // Light yellow background
            borderWidth: 0,
            display: showSafeZone,
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        hoverRadius: 8,
        radius: 4,
      },
    },
  };

  return <Line data={transformedData} options={options} />;
};

export default LineChart;
