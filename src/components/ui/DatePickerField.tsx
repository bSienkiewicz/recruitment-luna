import DatePicker from "react-datepicker";

interface DatePickerFieldProps {
  label: string;
  selected: Date;
  onChange: (date: Date | null) => void;
  maxDate?: Date;
  minDate?: Date;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, ...props }) => (
  <div className="text-sm">
    {label}
    <DatePicker
      shouldCloseOnSelect
      showTimeInput
      timeInputLabel="Time:"
      className="bg-transparent border border-lighter_dark focus:outline-none px-4 py-2 rounded-md text-xs w-full"
      withPortal
      dateFormat="MMM dd yyyy - HH:mm"
      {...props}
    />
  </div>
);

export default DatePickerField;