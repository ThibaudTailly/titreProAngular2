export enum UserRole {
  STANDARD,
  ADMIN
}

export class User {
  id: number = 0
  pseudo: string = ""
  password: string =""
  token: string = ""
  firstname: string = ""
  lastname: string = ""
  Name_etablisement = ""
  email: string = ""
  phone: number

  role: UserRole = UserRole.STANDARD

}
