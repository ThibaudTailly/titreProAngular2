import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user';

export { User, UserRole };



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = null

  constructor() {
    this.restoreUser();
  }

  restoreUser() {
    let userstr = localStorage.getItem("user");
    console.log(userstr, JSON.parse(userstr));
    let user = new User();
    let storedUser = JSON.parse(userstr);
    if (storedUser != null) {
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
  signUp()
  {
   //ToDo
  }
  signIn(pseudo: string , password: string)
  {
    //ToDo
    if (pseudo == "admin" && password == "admin")
    {
      let user = new User();
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
  logOut()
  {
     //prevenir serv logout
    this.user = null;
    this.storeUser(null);
  }

}
