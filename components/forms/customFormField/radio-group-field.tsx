import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenderOptions } from "@/lib/constants";
import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export const RadioGroupField = ({
  field,
}: {
  field: ControllerRenderProps<FieldValues, string>;
}): React.ReactNode => {
  return (
    <RadioGroup
      className="flex gap-2 h-11 xl:justify-between"
      defaultValue={field.value}
      onChange={field.onChange}>
      {GenderOptions.map((gender) => (
        <div className="flex items-center space-x-2" key={gender}>
          <RadioGroupItem value={gender} id={gender} />
          <Label htmlFor={gender}>{gender}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
