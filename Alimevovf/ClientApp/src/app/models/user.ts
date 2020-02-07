export enum UserRole {
  STANDARD,
  ADMIN
}

export class User {
  pseudo: string = ""
  token: string = ""
  firstname: string = ""
  lastname: string = ""
  email: string =""
  role: UserRole = UserRole.STANDARD

}
