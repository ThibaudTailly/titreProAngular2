export enum UserRole {
  STANDARD,
  ADMIN
}

export class User {
  id: number = 0
  pseudo: string = ""
  token: string = ""
  firstname: string = ""
  lastname: string = ""
  email: string =""
  role: UserRole = UserRole.STANDARD

}
