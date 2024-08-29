import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_APPWRITE_PROJECT,
  NEXT_APPWRITE_KEY,
  NEXT_PUBLIC_DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(NEXT_APPWRITE_KEY!)
  .setSelfSigned(true);

export const users = new sdk.Users(client);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const functions = new sdk.Functions(client);
