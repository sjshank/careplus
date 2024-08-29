import React from "react";
import { CustomFormField, FormFieldType } from "../customFormField";
import { IdentificationTypes } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

export const IdentificationInformation = ({
  form,
}: {
  form: UseFormReturn<any>;
}) => {
  return (
    <>
      <div className="space-y-4">
        <h3 className="sub-header">Identification and Verification</h3>
      </div>

      <CustomFormField
        form={form}
        fieldType={FormFieldType.SELECT}
        name="identificationType"
        label="Identification Type"
        placeholder="Select your identification">
        {IdentificationTypes.map((type) => (
          <SelectItem value={type} id={type} key={type}>
            <div className="flex items-center space-x-2">
              <Label htmlFor={type}>{type}</Label>
            </div>
          </SelectItem>
        ))}
      </CustomFormField>
      <CustomFormField
        form={form}
        fieldType={FormFieldType.INPUT}
        name="IdentificationNumber"
        label="Identification Number"
        placeholder="ABCD1234E"
      />
      <CustomFormField
        form={form}
        fieldType={FormFieldType.INPUT}
        name="IdentificationDocument"
        label="Upload Identification Document"
        inputType="file"
        iconSrc="/assets/icons/upload.svg"
        description="SVG, PNG, JPG or GIF"
      />
    </>
  );
};
