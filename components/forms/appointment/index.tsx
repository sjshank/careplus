"use client";

import { z } from "zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import {
  FormFieldType,
  CustomFormField,
  SubmitButton,
  FormHeader,
} from "../customFormField";
import { UseFormReturn } from "react-hook-form";
import { Doctors, Status } from "@/lib/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useAppointmentForm } from "@/schemas";
import { createAppointment, updateAppointment } from "@/data/api";
import { IAppointment, IAppointmentParams } from "@/models";

type AppointmentFormProps = {
  userId: string;
  patientId: string | undefined;
  type: "create" | "schedule" | "cancel";
  appointment?: IAppointment;
  closeModal?: Dispatch<SetStateAction<boolean>>;
};

export const AppointmentForm = ({
  patientId,
  type,
  userId,
  appointment = {} as IAppointment,
  closeModal = () => {},
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    form,
    formSchema: appointmentFormSchema,
  }: { form: UseFormReturn<any>; formSchema: z.ZodObject<any> } =
    useAppointmentForm(type, appointment);
  const isCancellation = type === "cancel";
  const btnClass = isCancellation ? "shad-danger-btn" : "shad-primary-btn";

  const btnLabel = isCancellation
    ? "Cancel Appointment"
    : type === "create"
    ? "Create Appointment"
    : "Schedule Appointment";

  const submitHandler = async (
    values: z.infer<typeof appointmentFormSchema>
  ) => {
    setIsLoading(!isLoading);
    try {
      if (type === "create" && patientId) {
        const appointmentData: any = {
          ...values,
          userId,
          patient: patientId,
          schedule: new Date(values.schedule),
          status: Status.pending,
        };

        const response = await createAppointment(appointmentData);
        if (response) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${response?.$id}`
          );
        }
      } else {
        const appointmentData: Partial<IAppointmentParams> = isCancellation
          ? {
              cancellationReason: values.cancellationReason,
            }
          : {
              schedule: new Date(values.schedule),
              status: Status.scheduled,
              notes: values.notes,
              userId: userId,
            };
        await updateAppointment(appointmentData, patientId!);
        closeModal(false);
      }
    } catch (e) {
      console.error(e);
      throw new Error("Unable to proccess the request !");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-6 flex-1">
        {type === "create" && (
          <FormHeader
            title={`Hello again !`}
            description="Request a new appointment in few seconds."
          />
        )}
        {!isCancellation && (
          <>
            <CustomFormField
              form={form}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              disabled={type === "schedule"}
              placeholder="Select a Doctor">
              {Doctors.map((doctor) => (
                <SelectItem
                  value={doctor.name}
                  id={doctor.name}
                  key={doctor.name}>
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
            <CustomFormField
              form={form}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected Appointment Date"
              showTimeSelect={true}
              minDate={form.formState.defaultValues?.schedule}
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <CustomFormField
              form={form}
              fieldType={FormFieldType.TEXTAREA}
              name="reason"
              label="Reason for Appointment"
              placeholder="Regular itching"
              disabled={type === "schedule"}
            />
            <CustomFormField
              form={form}
              fieldType={FormFieldType.TEXTAREA}
              name="notes"
              label="Additional Notes"
              placeholder="Provide wheelchair assistance"
            />
          </>
        )}

        {isCancellation && (
          <CustomFormField
            form={form}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for Cancellation"
            placeholder="Public holiday"
          />
        )}
        <SubmitButton isLoading={isLoading} className={`${btnClass}`}>
          {btnLabel ?? ""}
        </SubmitButton>
      </form>
    </Form>
  );
};
