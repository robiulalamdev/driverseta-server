/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id: string;
  phoneNumber: string;
  role: string;
  name: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<
    Pick<
      IUser,
      | '_id'
      | 'phoneNumber'
      | 'name'
      | 'password'
      | 'role'
      | 'needsPasswordChange'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
