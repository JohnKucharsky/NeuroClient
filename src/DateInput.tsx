import { FocusEvent } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function DateInput({
  touched,
  error,
  label,
  value,
  handleBlur,
  setFieldValue,
  name,
  required,
}: {
  touched: boolean | undefined;
  error: string | undefined;
  label: string;
  value: string | null;
  handleBlur: (
    e: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
      Element
    >,
  ) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void;
  name: string;
  required?: boolean;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        views={["year", "month", "day"]}
        value={dayjs(value)}
        label={label}
        onChange={(newValue) => {
          setFieldValue(name, newValue);
        }}
        format={"DD.MM.YYYY"}
        slotProps={{
          textField: {
            helperText: touched && error,
            inputProps: { required: false, placeholder: "дд.мм.гггг" },
            fullWidth: true,
            name,
            onBlur: handleBlur,
            required,
            error: Boolean(error),
          },
        }}
      />
    </LocalizationProvider>
  );
}
