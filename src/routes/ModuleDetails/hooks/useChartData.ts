import { useState } from "react";
import toast from "react-hot-toast";
import { useModule } from "../../../hooks/useModule";

export const useChartData = () => {
  const [chartDateStart, setChartDateStart] = useState<Date>(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  );
  const [chartDateEnd, setChartDateEnd] = useState<Date>(new Date());
  const {fetchHistoricalReadings} = useModule();

  const handleDateFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchHistoricalReadings(
      chartDateStart.toISOString(),
      chartDateEnd.toISOString(),
      e.currentTarget.range_mode.value
    );
  };

  const compareDates = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return;
    if (startDate > endDate) {
      toast.error("Start date cannot be greater than end date.");
      setChartDateStart(new Date());
      return false;
    }

    return true;
  };

  return { handleDateFormSubmit, compareDates, setChartDateEnd, setChartDateStart, chartDateStart, chartDateEnd};
};
