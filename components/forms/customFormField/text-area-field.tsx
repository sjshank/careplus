import React from "react";
import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

export const TextAreaField = ({
  field,
  placeholder,
  disabled,
}: {
  field: ControllerRenderProps<FieldValues, string>;
  placeholder: string;
  disabled: boolean;
}) => {
  return (
    <FormControl>
      <Textarea
        placeholder={placeholder}
        {...field}
        className="shad-textArea"
        disabled={disabled}
      />
    </FormControl>
  );
};
