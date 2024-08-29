import React from "react";
import { FormControl } from "@/components/ui/form";
import { E164Number } from "libphonenumber-js";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

export const PhoneInputField = ({
  field: { onChange, value },
}: {
  field: ControllerRenderProps<FieldValues, string>;
}) => {
  return (
    <FormControl>
      <PhoneInput
        defaultCountry="IN"
        international
        countryCallingCodeEditable
        onChange={onChange}
        value={value as E164Number | undefined}
        className="input-phone"
      />
    </FormControl>
  );
};
