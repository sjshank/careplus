import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomFormFieldProps } from "./form-fields";

export const CheckboxField = ({
  field,
  formFieldProps: { name, label },
}: {
  field: ControllerRenderProps<FieldValues, string>;
  formFieldProps: CustomFormFieldProps;
}) => {
  return (
    <div className="flex items-center gap-4">
      <Checkbox
        id={name}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <label htmlFor={name} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};
