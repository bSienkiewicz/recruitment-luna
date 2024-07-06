import LineChart from "../../../components/LineChart";
import { useChartData } from "../hooks/useChartData";
import DatePicker from "react-datepicker";

interface SectionChartInfoProps {
  readings: any[];
  safeTemperatureRanges: {
    min: number;
    max: number;
    warnMin: number;
    warnMax: number;
  };
}

const SectionModuleChart = ({
  readings,
  safeTemperatureRanges
}: SectionChartInfoProps) => {
  const {
    handleDateFormSubmit,
    setChartDateStart,
    setChartDateEnd,
    compareDates,
    chartDateStart,
    chartDateEnd,
  } = useChartData();

  return (
    <>
      <div className="col-span-6 bg-dark p-5">
        <p className="font-semibold mb-2">Time range</p>
        <form className="flex flex-wrap gap-3" onSubmit={handleDateFormSubmit}>
          <div className="text-sm">
            Start:
            <DatePicker
              shouldCloseOnSelect
              showTimeInput
              timeInputLabel="Time:"
              selected={chartDateStart}
              className="bg-transparent border border-lighter_dark focus:outline-none px-4 py-2 rounded-md text-xs"
              onChange={(date) => {
                if (date && compareDates(date, chartDateEnd)) {
                  setChartDateStart(date);
                }
              }}
              maxDate={chartDateEnd}
              withPortal
              dateFormat="MMM dd yyyy - HH:mm"
            />
          </div>
          <div className="text-sm">
            End:
            <DatePicker
              shouldCloseOnSelect
              showTimeInput
              timeInputLabel="Time:"
              selected={chartDateEnd}
              className="bg-transparent border border-lighter_dark focus:outline-none px-4 py-2 rounded-md text-xs"
              onChange={(date) => {
                if (date && compareDates(chartDateStart, date)) {
                  setChartDateEnd(date);
                }
              }}
              minDate={chartDateStart}
              withPortal
              dateFormat="MMM dd yyyy - HH:mm"
            />
          </div>
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
            className="bg-darker border border-lighter_dark  rounded-md px-4 py-2 font-semibold text-xs self-end"
            type="submit"
          >
            Show
          </button>
        </form>
      </div>
      <div className="flex flex-col bg-dark p-5 h-full min-h-[500px] lg:hidden">
        <LineChart
          data={readings}
          safeTemperatureRanges={safeTemperatureRanges}
          small={true}
        />
      </div>
      <div className="col-span-6 row-span-4 flex-col bg-dark p-5 h-full min-h-[500px] lg:min-h-full hidden lg:flex relative">
        <p className="font-semibold mb-2">Historical data</p>
        <div className="flex-1">
          <LineChart
            data={readings}
            safeTemperatureRanges={safeTemperatureRanges}
          />
        </div>
      </div>
    </>
  );
};

export default SectionModuleChart;
