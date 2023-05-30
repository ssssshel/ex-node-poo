export interface ICreateUserParams {
  name: string;
  lastname: string;
  rfc: string;
}

export interface ICreateAccountParams {
  type: string;
  rfc: string;
  accountNumber?: string;
}

export interface ICreateTransferParams {
  originAccountNumber: string;
  destinationAccountNumber: string;
  amount: number;
}