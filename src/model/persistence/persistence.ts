import { Users, Accounts } from "../db/tables"
import { nanoid } from "nanoid";

export class Persistence {
  public Save(table: string = "users" || "accounts", data: any) {
    console.log("Saving...")
    const res = { id: this.getUID(), ...data }
    switch (table) {
      case "users":
        Users.push(res)
        return res
      case "accounts":
        Accounts.push(res)
        return res
      default:
        return []
    }
  }

  public Find(table: string = "users" || "accounts", filter: any) {
    console.log("Finding...", table, filter)
    switch (table) {
      case "users":
        return Users.filter((user) => this.matchesFilter(user, filter))
      case "accounts":
        return Accounts.filter((account) => this.matchesFilter(account, filter))
      default:
        return []
    }
  }

  public Update(table: string = "users" || "accounts", filter: any, data: any) {
    console.log("Updating...", table, filter, data)
    switch (table) {
      case "users":
        Users.forEach((user, index) => {
          if (this.matchesFilter(user, filter)) {
            Users[index] = { ...user, ...data }
            console.log("Updated", Users[index])
            return Users[index]
          }
        })
      case "accounts":
        Accounts.forEach((account, index) => {
          if (this.matchesFilter(account, filter)) {
            Accounts[index] = { ...account, ...data }
            console.log("Updated", Accounts[index])
            return Accounts[index]
          }
        })
      default:
        return []
    }
  }

  private getUID(): string {
    return nanoid(12)
  }

  private matchesFilter(item: any, filter: any) {
    for (const key in filter) {
      if (item[key] !== filter[key]) {
        return false;
      }
    }
    return true;
  }
}