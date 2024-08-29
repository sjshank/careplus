import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export const DatePickerField = ({
  field,
  dateFormat,
  showTimeSelect,
  minDate,
  maxDate,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  dateFormat?: string;
  showTimeSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const { value, onChange } = field;
  return (
    <div className="flex rounded-md border border-dark-500 bg-dark-400">
      <Image
        src="/assets/icons/calendar.svg"
        alt="calendar"
        height={30}
        width={30}
        className="ml-2"
      />
      <DatePicker
        selected={value}
        onChange={(date: any) => onChange(date)}
        showTimeSelect={showTimeSelect ? showTimeSelect : false}
        dateFormat={dateFormat ?? "MM/dd/yyyy"}
        minDate={minDate}
        maxDate={maxDate}
        timeInputLabel="Time:"
        wrapperClassName="date-picker"
      />
    </div>
  );
};
