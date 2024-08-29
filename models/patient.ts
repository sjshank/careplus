import { Models } from "node-appwrite";
import { ICreateUserParams } from "./user";

export interface IRegisterPatientParams extends ICreateUserParams {
  userId: string;
  birthDate: Date;
  gender: "Male" | "Female" | "Other";
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | any;
  privacyConsent: boolean;
  treatmentConsent?: boolean;
  disclosureConsent?: boolean;
}

export interface IPatient
  extends IRegisterPatientParams,
    Partial<Models.Document> {}
