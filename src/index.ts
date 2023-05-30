import { Service } from "./service/service";
import { ICreateAccountParams, ICreateUserParams } from "./shared/interfaces/params";

class Main {
  private service: Service;

  constructor() {
    this.service = new Service();
  }


  public async registerUser(params: ICreateUserParams) {
    console.log("---------------------")
    const saveAction = await this.service.saveUser(params)
    console.log("Response: ", saveAction)
    return saveAction
  }

  public async registerAccount(params: ICreateAccountParams) {
    console.log("---------------------")
    const saveAction = await this.service.saveAccount(params)
    console.log("Response: ", saveAction)
    return saveAction
  }

  public async registerTransfer(params: any) {
    console.log("---------------------")
    const saveAction = await this.service.saveTransfer(params)
    console.log("Response: ", saveAction)
    return saveAction
  }
}

async function executeMethods() {
  const main = new Main();

  // Usuarios

  const user1: any = await main.registerUser({
    name: "Juan",
    lastname: "Perez",
    rfc: "PERJ920422"
  });
  const user2: any = await main.registerUser({
    name: "Juan",
    lastname: "Perez",
    rfc: "PERJ920422"
  });
  await main.registerUser({
    name: "Rodrigo",
    lastname: "Perez",
    rfc: "PERR920423"
  });

  // Cuentas
  const account1: any = await main.registerAccount({
    type: "simple",
    rfc: "PERJ920422"
  })
  await main.registerAccount({
    type: "simple",
    rfc: "PERJ92042"
  })
  const account2: any = await main.registerAccount({
    type: "ahorro",
    rfc: "PERR920423"
  })

  const accountNumber1 = account1.data.accountNumber;
  const accountNumber2 = account2.data.accountNumber;

  console.log("accountNumber1: ", accountNumber1)
  console.log("accountNumber2: ", accountNumber2)

  // Transferencias

  await main.registerTransfer({
    originAccountNumber: accountNumber1,
    destinationAccountNumber: accountNumber2,
    amount: 100
  })
  await main.registerTransfer({
    originAccountNumber: 'jfjffjfjfjf',
    destinationAccountNumber: accountNumber2,
    amount: 100
  })
  await main.registerTransfer({
    originAccountNumber: accountNumber2,
    destinationAccountNumber: accountNumber1,
    amount: 100
  })

}

executeMethods();


// new Main().registerAccount({
//   type: "simple",
//   rfc: "PERJ920422"
// })