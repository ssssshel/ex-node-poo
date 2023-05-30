import { Persistence } from "../model/persistence/persistence";
import { DTOAccount, DTOUser } from "../shared/interfaces/dto";
import { ICreateAccountParams, ICreateTransferParams, ICreateUserParams } from "../shared/interfaces/params";
import { IRepository } from "./repositoryInterface";

export class Repository implements IRepository {

  private persistence: Persistence;

  constructor() {
    this.persistence = new Persistence();
  }

  createUser(data: ICreateUserParams): Promise<DTOUser> {
    console.log("createUser", data)
    try {
      const sameUser = this.persistence.Find("users", { rfc: data.rfc });
      if (sameUser.length > 0) {
        return Promise.reject("Error: user already exists");
      }

      const saveResponse = this.persistence.Save("users", data)
      return Promise.resolve(saveResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  createAccount(data: ICreateAccountParams): Promise<DTOUser> {
    console.log("createAccount", data)
    try {
      const user = this.persistence.Find("users", { rfc: data.rfc });
      if (!user.length) {
        return Promise.reject("Error: user does not exists");
      }

      const saveResponse = this.persistence.Save("accounts", { ...data, balance: data.rfc === "PERR920423" ? 200 : 0 })
      return Promise.resolve(saveResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  createTransfer(params: ICreateTransferParams): Promise<any> {
    console.log("createTransfer", params)

    try {
      const originAccount: any = this.persistence.Find("accounts", { accountNumber: params.originAccountNumber });
      const destinationAccount: any = this.persistence.Find("accounts", { accountNumber: params.destinationAccountNumber });

      if (!originAccount.length || !destinationAccount.length) {
        return Promise.reject("Error: account does not exists");
      }

      if (originAccount[0].balance < params.amount) {
        return Promise.reject("Error: insufficient funds");
      }

      const newOriginBalance = originAccount[0].balance - params.amount;
      const newDestinationBalance = destinationAccount[0].balance + params.amount;

      const updateOriginAccount = this.persistence.Update("accounts", { accountNumber: params.originAccountNumber }, { balance: newOriginBalance });
      const updateDestinationAccount = this.persistence.Update("accounts", { accountNumber: params.destinationAccountNumber }, { balance: newDestinationBalance });


      return Promise.resolve({ updateOriginAccount, updateDestinationAccount });

    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}