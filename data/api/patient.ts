"use server";

import {
  databases,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT,
  NEXT_PUBLIC_BUCKET_ID,
  PATIENT_COLLECTION_ID,
  storage,
} from "@/lib/appwrite.config";
import { IPatient, IRegisterPatientParams } from "@/models/patient";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export const registerPatient = async (
  patient: IRegisterPatientParams
): Promise<Partial<IPatient> | undefined> => {
  try {
    const { identificationDocument } = patient;
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(
        NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }
    const result = await databases.createDocument(
      NEXT_PUBLIC_DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file
          ? `${NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${
              file?.$id
            }/view?project=${NEXT_PUBLIC_APPWRITE_PROJECT!}`
          : null,
        ...patient,
      }
    );
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getPatient = async (
  userId: string
): Promise<IPatient | undefined> => {
  try {
    const patient = await databases.listDocuments(
      NEXT_PUBLIC_DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return Array.isArray(patient.documents)
      ? (patient.documents[0] as IPatient)
      : undefined;
  } catch (e) {
    console.error(e);
  }
};
