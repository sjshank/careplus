import { Models } from "node-appwrite";

export interface ICreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export interface IUser extends ICreateUserParams, Partial<Models.Document> {}
