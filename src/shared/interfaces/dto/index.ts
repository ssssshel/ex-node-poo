import { ICreateAccountParams, ICreateUserParams } from "../params";

export interface DTOUser extends ICreateUserParams {
  id: string;
}

export interface DTOAccount extends ICreateAccountParams {
  id: string;
  balance: number;
}

