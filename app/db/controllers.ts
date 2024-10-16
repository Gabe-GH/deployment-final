"use server";

import bcrypt from "bcrypt";
import clientPromise from "./config";

import userSchema from "./schema/User";

const saltRounds = 10;

interface UserData {
  username: string;
  password: string;
}

export const RegisterUser = async (formData: UserData) => {
  let exists = false;

  try {
    let user = formData;

    userSchema.parse(user);

    const client = await clientPromise;

    // const db =
    //   process.env.NODE_ENV === "production"
    //     ? client.db(process.env.DB_PROD)
    //     : client.db(process.env.DB_DEV);

    const db = client.db(process.env.DB);

    const collection = db.collection(process.env.CLUSTER as string);

    const userExists = await collection.findOne({
      username: user.username,
    });

    if (userExists) {
      exists = true;
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(user.password, saltRounds);

    user.password = hashed;
    console.log(user.password);

    const createdUser = await collection.insertOne(user);

    return user.username;
  } catch (e) {
    const error = e as Error;

    if (error.message === "User already exists") throw e;
    else {
      console.log(e);
      throw e;
    }
  }
};

export const FindUser = async (formData: UserData) => {
  try {
    let user = formData;

    userSchema.parse(user);

    const client = await clientPromise;

    // const db =
    //   process.env.NODE_ENV === "production"
    //     ? client.db(process.env.DB_PROD)
    //     : client.db(process.env.DB_DEV);

    const db = client.db(process.env.DB);

    const collection = db.collection(process.env.CLUSTER as string);

    const existingUser = await collection.findOne({
      username: user.username,
    });

    if (!existingUser)
      throw new Error(`User with user ${user.username} doesn't exists`);

    const isMatch = await bcrypt.compare(user.password, existingUser.password);

    if (!isMatch) throw new Error(`Wrong password`);

    return existingUser;
  } catch (e) {
    const error = e as Error;

    if (error.message === "User already exists") throw e;
    else {
      console.log(e);
      throw e;
    }
  }
};
