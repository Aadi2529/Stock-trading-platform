import { useEffect, useRef } from "react";
import {
  createChart,
  LineSeries
} from "lightweight-charts";

const TradeChart = ({ data }) => {

  const chartRef = useRef();

  useEffect(() => {

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#0f172a" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      rightPriceScale: {
        borderColor: "#374151",
      },
      timeScale: {
        borderColor: "#374151",
      },
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: "#3b82f6",
      lineWidth: 2,
    });

    lineSeries.setData(data);

    const handleResize = () => {
      chart.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };

  }, [data]);

  return (
    <div
      ref={chartRef}
      className="w-full h-[400px]"
    />
  );
};

export default TradeChart;