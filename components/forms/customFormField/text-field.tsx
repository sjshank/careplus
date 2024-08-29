import Image from "next/image";
import { CustomFormFieldProps } from "./form-fields";
import { Input } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export const TextField = ({
  formFieldProps: { iconSrc, iconAlt, fieldType, inputType, placeholder },
  field,
}: {
  formFieldProps: Partial<CustomFormFieldProps>;
  field: ControllerRenderProps<FieldValues, string>;
}) => {
  return (
    <div className="flex rounded-md border border-dark-500 bg-dark-400">
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt || `${fieldType} icon`}
          height={30}
          width={30}
          className="ml-2 "
        />
      )}
      <FormControl>
        <Input
          type={inputType || "text"}
          placeholder={placeholder}
          {...field}
          className="shad-input border-0"
          value={field.value}
        />
      </FormControl>
    </div>
  );
};
