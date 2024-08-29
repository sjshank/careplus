"use client";

import { z } from "zod";
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { SubmitButton, FormHeader } from "@/components/forms/customFormField";
import { useRegisterPatientForm, registerPatientFormSchema } from "@/schemas";
import { PersonalInformation } from "./personal-info";
import { MedicalInformation } from "./medical-info";
import { IdentificationInformation } from "./identification-info";
import { ConsentPrivacy } from "./consent-privacy";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/data/api";
import { IRegisterPatientParams, IUser } from "@/models";

export const RegisterPatientForm = ({ user }: { user: IUser | undefined }) => {
  const { name } = user!;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { form }: { form: UseFormReturn<any> } = useRegisterPatientForm();

  const submitHandler = async (
    values: z.infer<typeof registerPatientFormSchema>
  ) => {
    setIsLoading(!isLoading);
    try {
      let formData;
      if (
        values.identificationDocument &&
        values.identificationDocument.length > 0
      ) {
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0]?.type,
        });
        formData = new FormData();
        formData.append("blobFile", blobFile);
        formData.append("fileName", values.identificationDocument[0]?.name);
      }

      const patientRegistrationData: IRegisterPatientParams = {
        ...values,
        userId: user?.$id!,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      const response = await registerPatient(patientRegistrationData);
      if (response) router.push(`/patients/${user?.$id}/new-appointment`);
      else alert("Unable to proccess your request !");
    } catch (e) {
      console.error(e);
      alert("Unable to proccess your request !");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-12 flex-1">
        <FormHeader
          title={`Welcome ${name} !`}
          description="Let us know more about yourself."
        />

        <PersonalInformation form={form} />
        <MedicalInformation form={form} />
        <IdentificationInformation form={form} />
        <ConsentPrivacy form={form} />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
