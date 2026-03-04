import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const TradeChart = ({ data }) => {

  const chartContainerRef = useRef();

  useEffect(() => {

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#0f172a" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: "#374151",
      },
      timeScale: {
        borderColor: "#374151",
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#3b82f6",
      lineWidth: 2,
    });

    lineSeries.setData(data);

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
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
      ref={chartContainerRef}
      className="w-full h-[400px]"
    />
  );

};

export default TradeChart;