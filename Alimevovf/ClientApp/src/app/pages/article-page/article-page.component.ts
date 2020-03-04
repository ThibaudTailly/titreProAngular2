  import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ck-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  article: Article = null
  

  constructor(
    //service qui va gerer les informations de l'url 
    private actRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private authSrv: AuthService
    ) {
   
  }

  
  ngOnInit()
  {
    // snapshot : etat a l'instant t, paramMap list des parametres données ds l'url
    let id = this.actRoute.snapshot.paramMap.get('id');
    //subscribe: 
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
  isAdmin() {
    return this.authSrv.isAdmin();
  }

}
