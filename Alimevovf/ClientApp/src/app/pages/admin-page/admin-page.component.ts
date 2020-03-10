import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ck-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {

  public users: User[];

  constructor(
    private actRoute: ActivatedRoute,
    private authSrv: AuthService
  ) {
  }

  ngOnInit()
  {
    //recuperation id
    let id = 1;
   
    if (!id) {
      return 
    }
   //REGARDER CAR C OBSCUR
    this.authSrv.getAllUser().subscribe(
      (data: any) => {
        console.log(data)
        this.users = [];
        debugger
        for (let duser of data) {
          let user: User = new User();
          user.id = duser["id"];
          user.email = duser["email"];
          user.firstname = duser["firstname"];
          user.lastname = duser["lastname"];
          user.phone = duser["phone"];
          this.users.push(user);
        }
        console.log(this.users); 
      },
      (error: any) => {
        console.error(error)
      });
  
  }
  
  //onSubmit() {

  //  if (!this.article.id) {
  //    this.articleSrv.create(this.article)
  //      .subscribe(
  //        (data: any) => {
  //          //renvoyer l'id de l'article au lieu d'un boolean
  //          console.log(data)
          

  //        },
  //        (error: any) => { console.error(error) }
  //      );
  //  }
  //  else {
  //   /* this.articleSrv.update(this.article).subscribe(
  //      (data: any) => {
  //        //renvoyer l'id de l'article au lieu d'un boolean
  //        console.log(data)
  //      },
  //      (error: any) => { console.error(error) }
  //    );*/
  //  }
   
  //}
}
