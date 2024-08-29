import { Models } from "node-appwrite";
import { IPatient } from "./patient";

export type TStatus = "pending" | "scheduled" | "cancelled";

export interface IAppointmentParams {
  patient: IPatient | string;
  reason: string | undefined;
  schedule: Date;
  notes: string;
  primaryPhysician: string;
  status: TStatus;
  userId: string;
  cancellationReason: string;
}

export interface IAppointment
  extends IAppointmentParams,
    Partial<Models.Document> {}
