import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ck-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.css'],
  providers: [DatePipe] // injectable service
})
export class EditArticlePageComponent implements OnInit {
  public article: Article
  @ViewChild('banner', { static: false }) myId: ElementRef;


  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private authSrv: AuthService,
    private articleSrv: ArticleService, // une instance injecté du service articlesrv
    public datepipe: DatePipe) {

  }

  ngOnInit() {
    document.getElementById("container").style.backgroundImage = "url(/assets/Ecriture.jpg)";
    /*
      this.getImage();
    

    getImage(){
      switch (value) {
        case 'a': {
          this.imageName = 'Nebula.jpg';
          break;
        }
        case 'b': {
          this.imageName = 'Eclipse.jpeg';
          break;
        }
      }
    }*/
    //recuperation id
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.article = new Article();
    if (!id) {
      return
    }
   
    this.articleSrv.getById(id).subscribe(
      (data: any) => {
        
        

        let article: Article = new Article();
        article.id = data["id"];
        article.title = data["title"];
        article.body = data["body"];
        article.picture = data["picture"];
        article.creationDate = new Date(data["dateOfCreation"]);
        article.lastModification = new Date(data["dateOfModification"]);
        console.log(data);
        article.fkCookUser = data["fkCookUser"];

        this.article = article;
        console.log(this.article)
      },
      (error: any) => { console.error(error) }
    );

  }

  formatDate(date: Date) {
    
    return this.datepipe.transform(date, 'dd/MM/yyyy')
  }

  saveArticle() {

    if (!this.article.id) {
      this.article.fkCookUser = this.authSrv.user.id;
      this.articleSrv.create(this.article)
        .subscribe( //methode asynchrone
          (data: any) => {
            //renvoyer l'id de l'article au lieu d'un boolean
            console.log(data)
          },
          (error: any) => { console.error(error) }
        );
    }
    else {
      this.articleSrv.update(this.article).subscribe(
        (data: any) => {
          //renvoyer l'id de l'article au lieu d'un boolean
          console.log(data)
        },
        (error: any) => { console.error(error) }
      );
    }

  }
  deleteArticle() {
    this.articleSrv.deleteArticleById(this.article.id).subscribe(
      (data: any) => {
        this.router.navigate(["/blog"]);
      //renvoyer l'id de l'article au lieu d'un boolean
        console.log(data)

      },
      (error: any) => { console.error(error) }
    );
  }
}
  

