import React from "react";
import { CustomFormField, FormFieldType } from "../customFormField";
import { Doctors } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

export const MedicalInformation = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <>
      <div className="space-y-4">
        <h3 className="sub-header">Medical Information</h3>
      </div>
      <CustomFormField
        form={form}
        fieldType={FormFieldType.SELECT}
        name="primaryPhysician"
        label="Primary Physician"
        placeholder="Select your primary physician">
        {Doctors.map((doctor) => (
          <SelectItem value={doctor.name} id={doctor.name} key={doctor.name}>
            <div className="flex items-center space-x-2">
              <Image
                src={doctor.image}
                alt={doctor.name}
                height={30}
                width={30}
              />
              <Label htmlFor={doctor.name}>{doctor.name}</Label>
            </div>
          </SelectItem>
        ))}
      </CustomFormField>

      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          form={form}
          fieldType={FormFieldType.INPUT}
          name="insuranceProvider"
          label="Insurance Provider Name"
          placeholder="LIC India"
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.INPUT}
          name="insurancePolicyNumber"
          label="Insurance Policy Number"
          placeholder="2791919123"
        />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          form={form}
          fieldType={FormFieldType.TEXTAREA}
          name="allergies"
          label="Allergies (if any)"
          placeholder="Penicillin, Pollen"
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.TEXTAREA}
          name="currentMedication"
          label="Current Medication (if any)"
          placeholder="Crocin, Seneris 250mg"
        />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          form={form}
          fieldType={FormFieldType.TEXTAREA}
          name="familyMedicalHistory"
          label="Family Medical History (if any)"
          placeholder="Diabetics, BP"
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.TEXTAREA}
          name="pastMedicalHistory"
          label="Past Medical History (if any)"
          placeholder="N/A"
        />
      </div>
    </>
  );
};
