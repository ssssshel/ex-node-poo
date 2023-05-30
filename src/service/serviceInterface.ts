import { ICreateAccountParams, ICreateUserParams } from "../shared/interfaces/params";

export interface IService {
  saveUser(params: ICreateUserParams): any

  saveAccount(params: ICreateAccountParams): any

  saveTransfer(params: any): any
}