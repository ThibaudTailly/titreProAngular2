import { Component,Input, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit{
  @Input() blogs: any[]
  article: Article = null

  constructor(
    //service qui va gerer les informations de l'url 
    private actRoute: ActivatedRoute,
    private articleSrv: ArticleService
  ) {

  } ngOnInit() {
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
}

