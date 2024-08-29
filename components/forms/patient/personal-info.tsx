import React from "react";
import {
  CustomFormField,
  FormFieldType,
  RadioGroupField,
} from "../customFormField";
import { UseFormReturn } from "react-hook-form";

export const PersonalInformation = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <>
      <div className="space-y-4">
        <h3 className="sub-header">Personal Information</h3>
      </div>
      <CustomFormField
        form={form}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full Name"
        iconAlt="user icon"
        placeholder="Saurabh Shankariya"
        iconSrc="/assets/icons/user.svg"
      />

      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          form={form}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          iconAlt="email icon"
          placeholder="sjshankariya@gmail.com"
          iconSrc="/assets/icons/email.svg"
          inputType="email"
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone number"
          placeholder="8087797428"
        />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          form={form}
          fieldType={FormFieldType.DATE_PICKER}
          name="birthdDate"
          label="Date of Birth"
          showTimeSelect={true}
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.SKELETON}
          name="gender"
          label="Gender"
          renderSkeleton={(field) => <RadioGroupField field={field} />}
        />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          form={form}
          fieldType={FormFieldType.INPUT}
          name="address"
          label="Address"
          placeholder="521, Mahal, Nagpur, India"
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.INPUT}
          name="occupation"
          label="Occupation"
          placeholder="Software Engineer"
        />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          form={form}
          fieldType={FormFieldType.INPUT}
          name="emergencyContactName"
          label="Emergency Contact Name"
          iconAlt="user icon"
          placeholder="Jayprakash Shankariya"
          iconSrc="/assets/icons/user.svg"
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.PHONE_INPUT}
          name="emergencyContactNumber"
          label="Emergency Contact Number"
          placeholder="1234567890"
        />
      </div>
    </>
  );
};
