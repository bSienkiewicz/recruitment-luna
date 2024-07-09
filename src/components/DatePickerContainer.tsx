import React from "react";
import DatePickerField from "./ui/DatePickerField";

interface DatePickerContainerProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDateChange: (start: Date | null, end: Date | null) => void;
  chartDateRange: {
    start: Date;
    end: Date;
  };
}

const DatePickerContainer = ({ handleSubmit, handleDateChange, chartDateRange }: DatePickerContainerProps) => {
  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-4 gap-3"
      onSubmit={handleSubmit}
    >
      <DatePickerField
        label="Start date:"
        selected={chartDateRange.start}
        onChange={(date) => handleDateChange(date, chartDateRange.end)}
        maxDate={chartDateRange.end}
      />
      <DatePickerField
        label="End date:"
        selected={chartDateRange.end}
        onChange={(date) => handleDateChange(chartDateRange.start, date)}
        minDate={chartDateRange.start}
      />
      <select
        className="self-end px-4 py-2 text-xs bg-transparent border border-lighter_dark rounded-md"
        name="range_mode"
      >
        <option value="hourly" className="bg-dark">
          Hourly
        </option>
        <option value="daily" className="bg-dark">
          Daily
        </option>
      </select>
      <button
        className="button-black px-4 py-2 font-semibold text-xs self-end"
        type="submit"
      >
        Show
      </button>
    </form>
  );
};

export default DatePickerContainer;
