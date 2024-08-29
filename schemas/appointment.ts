import { AppointmentFormValidationMessages } from "@/lib/constants";
import { IAppointment } from "@/models/appointment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const {
  primaryPhysician: { min: primaryPhysicianMin },
  reason: { min: reasonMin, max: reasonMax },
} = AppointmentFormValidationMessages;

export const appointmentFormSchema = (type: string) =>
  z.object({
    primaryPhysician: z.string().min(2, primaryPhysicianMin),
    reason:
      type !== "cancel"
        ? z.string().min(2, reasonMin).max(50, reasonMax)
        : z.string().optional().default(""),
    notes: z.string().optional().default(""),
    schedule: z.date().default(new Date()),
    cancellationReason:
      type === "cancel"
        ? z.string().min(2, reasonMin).max(500, reasonMax)
        : z.string().optional().default(""),
  });

export const useAppointmentForm = (
  type: string,
  appointment: IAppointment = {} as IAppointment
) => {
  const formSchema = appointmentFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryPhysician: appointment.primaryPhysician
        ? appointment.primaryPhysician
        : "",
      reason: appointment.reason ? appointment.reason : "",
      notes: appointment.rnoteseason ? appointment.notes : "",
      schedule: appointment.schedule
        ? new Date(appointment.schedule)
        : new Date(),
      cancellationReason: appointment.cancellationReason
        ? appointment.cancellationReason
        : "",
    },
  });

  return { form, formSchema };
};
