import DatePickerField from "./ui/DatePickerField";

interface DatePickerContainerProps {
  handleDateChange: (start: Date | null, end: Date | null) => void;
  handleRangeModeChange: (rangeMode: "hourly" | "daily") => void;
  chartDateRange: {
    start: Date;
    end: Date;
  };
}

const DatePickerContainer = ({ handleDateChange, handleRangeModeChange, chartDateRange }: DatePickerContainerProps) => {
  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-4 gap-3"
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
        maxDate={new Date()}
        
      />
      <select
        className="self-end px-4 py-2 text-xs bg-transparent border border-lighter_dark rounded-md"
        name="range_mode"
        onChange={(e) => handleRangeModeChange(e.target.value as "hourly" | "daily")}
      >
        <option value="hourly" className="bg-dark">
          Hourly
        </option>
        <option value="daily" className="bg-dark">
          Daily
        </option>
      </select>
    </form>
  );
};

export default DatePickerContainer;
