import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { CustomFormFieldProps } from "./form-fields";

export const SelectField = ({
  field,
  formFieldProps: { placeholder, disabled },
  children,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  formFieldProps: Partial<CustomFormFieldProps>;
  children: React.ReactNode;
}) => {
  const { onChange, value } = field;
  return (
    <FormControl>
      <Select onValueChange={onChange} defaultValue={value} disabled={disabled}>
        <FormControl>
          <SelectTrigger className="shad-select-trigger">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="shad-select-content">
          {children}
        </SelectContent>
      </Select>
    </FormControl>
  );
};
