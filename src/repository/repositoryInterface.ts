import { DTOUser } from "../shared/interfaces/dto";
import { ICreateAccountParams, ICreateTransferParams, ICreateUserParams } from "../shared/interfaces/params";

export interface IRepository {
  createUser(params: ICreateUserParams): Promise<DTOUser>;

  createAccount(params: ICreateAccountParams): Promise<DTOUser>;

  createTransfer(params: ICreateTransferParams): Promise<any>;
}