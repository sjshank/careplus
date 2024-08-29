"use server";
import { users } from "@/lib/appwrite.config";
import { ICreateUserParams, IUser } from "@/models/user";
import { ID, Models, Query } from "node-appwrite";

export const createUser = async (user: ICreateUserParams): Promise<any> => {
  try {
    const userList: Models.UserList<Models.Preferences> = await users.list([
      Query.equal("email", user.email),
    ]);
    if (userList && userList?.users) {
      return userList.users[0];
    }
    const result: Models.User<Models.Preferences> = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (userId: string): Promise<IUser | undefined> => {
  try {
    const user: IUser = await users.get(userId);
    return user;
  } catch (e) {
    console.error(e);
  }
};
