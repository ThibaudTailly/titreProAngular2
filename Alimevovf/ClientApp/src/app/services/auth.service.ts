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

  restoreUser() {
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
    //ToDo
    if (pseudo == "admin" && password == "admin")
    {
      let user = new User();
      user.id = 1
      user.pseudo = "pseudo";
      user.firstname = "poipoi";
      user.lastname = "poipoi";
      user.email = "thibaud@gmail.com";
      user.role = UserRole.ADMIN;
      this.storeUser(user)
      this.user = user;
    }
    console.warn('signIn',pseudo,password)
  }
  getAllUser() {
    return this.http.get("/api/user/all")
  }
  logOut()
  {
     //prevenir serv logout
    this.user = null;
    this.storeUser(null);
  }

}
