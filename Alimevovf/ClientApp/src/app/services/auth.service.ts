import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user';
import { HttpClient } from '@angular/common/http';
export { User, UserRole };



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = null

  constructor(private http: HttpClient) {
    this.restoreUser();
  }

  restoreUser()  {
    let userstr = localStorage.getItem("user");
    console.log(userstr, JSON.parse(userstr));
    let user = new User();
    let storedUser = JSON.parse(userstr);
    if (storedUser != null) {
      user.id = storedUser['id'];
      user.firstname = storedUser['firstname'];
      user.lastname = storedUser['lastname'];
      user.email = storedUser['email'];
      user.role = storedUser['role'];
      this.user = user;
    }
    else {
      this.user = null
    }
    
  }
  storeUser(user:User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  isLogged():boolean
  {
   

    return !!this.user
  }
  isAdmin(): boolean
  {
    if (!this.isLogged()) return false

    return this.user.role == UserRole.ADMIN
    
  }
  signUp(user: User)
  {
    let Nuser: any = {}
    Nuser.FirstName = user.firstname;
    Nuser.LastName = user.lastname;
    Nuser.Email = user.email;
    Nuser.Password = user.password;
 
    return this.http.post("/api/user/create", Nuser);//créer un observable mais n'envoye pas la requete

  }
  signIn(pseudo: string , password: string)
  {
    let dUserLogs: any = {}
    dUserLogs.Mail = pseudo;
    dUserLogs.Password = password;
    //ToDo

    return this.http.post("api/user/auth", dUserLogs)
  }

  handleUserAuth(user: User | any) {
    console.log(user)
    if (!(user instanceof User)) {
      let nUser: User = new User();
      nUser.id = user.id;
      nUser.firstname = user.firstName;
      nUser.lastname = user.lastName;
      nUser.email = user.email;
      nUser.phone = user.phoneNumber;
      nUser.role = user.userRole;
      user = nUser;
    }
      this.storeUser(user)
      this.user = user;
    
  }
  getAllUser() {
    return this.http.get("/api/user/all")
  }

  updateUser(user: User) {
    let dUser: any = {}
    dUser.Id = user.id;
    dUser.firstName = user.firstname;
    dUser.lastName = user.lastname;
    dUser.email = user.email;
    dUser.phoneNumber = user.phone;
    dUser.role = user.role;
    return this.http.post("api/user/update",dUser);
  }

  deleteUserById(id:number) {

    return this.http.delete("api/user/" + id);
  }
  logOut()
  {
     //prevenir serv logout
    this.user = null;
    this.storeUser(null);
  }

}
