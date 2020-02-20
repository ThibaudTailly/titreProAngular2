import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ck-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.css'],
  providers: [DatePipe] // injectable service
})
export class EditArticlePageComponent implements OnInit {
  public article: Article;
  

  constructor(
    private actRoute: ActivatedRoute,
    private articleSrv: ArticleService, // une instance injecté du service articlesrv
    public datepipe: DatePipe){

  }

  ngOnInit() {
    //recuperation id
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.article = new Article();
    if (!id) {
      return 
    }
   //REGARDER CAR C OBSCUR
     this.articleSrv.getById(id).subscribe(
      (data: any) => {
        console.log(data)
        let article: Article = new Article();
        article.id = data["id"];
        article.title = data["title"];
        article.body = data["body"];
        article.picture = data["picture"];
        article.creationDate = new Date(data["creationDate"]);
        article.lastModification = new Date(data["lastModification"]);
        

        this.article = article;
      },
      (error: any) => { console.error(error) }
    );

  }

  formatDate(date: Date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy')
  }
  
  onSubmit() {

    if (!this.article.id) {
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
     /* this.articleSrv.update(this.article).subscribe(
        (data: any) => {
          //renvoyer l'id de l'article au lieu d'un boolean
          console.log(data)
        },
        (error: any) => { console.error(error) }
      );*/
    }
   
  }
}
