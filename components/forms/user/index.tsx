"use client";

import { z } from "zod";
import React, { useState } from "react";
import { userFormSchema, useUserForm } from "@/schemas";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import {
  FormFieldType,
  CustomFormField,
  SubmitButton,
} from "@/components/forms/customFormField";
import { ICreateUserParams } from "@/models";
import { Models } from "node-appwrite";
import { createUser } from "@/data/api";
import { UseFormReturn } from "react-hook-form";
import { FormHeader } from "../customFormField/form-header";

export const UserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { form }: { form: UseFormReturn<any> } = useUserForm();

  const submitHandler = async ({
    email,
    name,
    phone,
  }: z.infer<typeof userFormSchema>) => {
    setIsLoading(!isLoading);
    try {
      const userData: ICreateUserParams = { name, email, phone };
      const user: Models.User<Models.Preferences> | undefined =
        await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-6 flex-1">
        <FormHeader
          title={`Hello there !`}
          description="Schedule your first appointment."
        />
        <CustomFormField
          form={form}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          iconAlt="user icon"
          placeholder="Saurabh Shankariya"
          iconSrc="/assets/icons/user.svg"
          inputType="text"
        />
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
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
