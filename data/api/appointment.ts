"use server";

import {
  databases,
  NEXT_PUBLIC_DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
  messaging,
} from "@/lib/appwrite.config";
import { formatDateTime } from "@/lib/utils";
import { IAppointment, IAppointmentParams } from "@/models/appointment";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

export const createAppointment = async (
  appointment: IAppointmentParams
): Promise<Partial<IAppointment> | undefined> => {
  try {
    const result = await databases.createDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getAppointment = async (
  appointmentId: string
): Promise<IAppointment | undefined> => {
  try {
    const appointment = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.equal("$id", appointmentId)]
    );
    return Array.isArray(appointment.documents)
      ? (appointment.documents[0] as IAppointment)
      : undefined;
  } catch (e) {
    console.error(e);
  }
};

export const getAllAppointments = async (): Promise<any> => {
  try {
    const appointments = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!
    );
    return Array.isArray(appointments.documents)
      ? (appointments.documents as IAppointment[])
      : [];
  } catch (e) {}
};

export const updateAppointment = async (
  appointment: Partial<IAppointmentParams>,
  patientId: string
) => {
  try {
    const result = await databases.updateDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      patientId,
      appointment
    );
    if (result) {
      await sendSMSNotification(
        appointment.userId!,
        appointment.status === "scheduled"
          ? `Success ! Appointment scheduled at ${
              formatDateTime(appointment.schedule!).dateTime
            }`
          : `Sorry ! Due to some reason, your appointment has been cancelled.`
      );
      revalidatePath("/admin");
    } else {
      throw new Error("Unable to proccess the request !");
    }
  } catch (e) {
    throw new Error("Unable to proccess the request !");
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  await messaging.createSms(ID.unique(), content, [], [userId]);
};
