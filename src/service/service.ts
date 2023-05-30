import { Response2xxSuccessful, Response4xxClientError, Response5xxServerError } from "restponses"
import { ICreateAccountParams, ICreateUserParams } from "../shared/interfaces/params";
import { Repository } from "../repository/repository";

export class Service {

  private repository: Repository

  constructor() {
    this.repository = new Repository();
  }

  async saveUser(params: ICreateUserParams) {
    const { name, lastname, rfc } = params;
    if (!name || !lastname || !rfc) {
      return Response4xxClientError("400BadRequest", { serverMessage: "Missing parameters" })
    }
    try {
      const res = await this.repository.createUser(params)
      return Response2xxSuccessful("201Created", { serverMessage: "User created successfully", data: res })
    } catch (error: any) {
      return Response5xxServerError("500InternalServerError", { serverMessage: error })
    }
  }

  async saveAccount(params: ICreateAccountParams) {
    const { type, rfc } = params;
    if (!type || !rfc) {
      return Response4xxClientError("400BadRequest", { serverMessage: "Missing parameters" })
    }

    const newAccountNumber = Math.floor(Math.random() * 1000000000000) + 1;

    try {
      const res = await this.repository.createAccount({ ...params, accountNumber: String(newAccountNumber) })
      return Response2xxSuccessful("201Created", { serverMessage: "Account created successfully", data: res })
    } catch (error: any) {
      return Response5xxServerError("500InternalServerError", { serverMessage: error })
    }
  }

  async saveTransfer(params: any) {
    const { originAccountNumber, destinationAccountNumber, amount } = params;
    if (!originAccountNumber || !destinationAccountNumber || !amount) {
      return Response4xxClientError("400BadRequest", { serverMessage: "Missing parameters" })
    }
    try {
      const res = await this.repository.createTransfer(params)
      return Response2xxSuccessful("201Created", { serverMessage: "Transfer created successfully", data: res })
    } catch (error: any) {
      return Response5xxServerError("500InternalServerError", { serverMessage: error })
    }
  }
}