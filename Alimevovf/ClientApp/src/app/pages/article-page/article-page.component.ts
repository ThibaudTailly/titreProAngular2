import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

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
    private articleSrv : ArticleService
    ) {
   
  }

  ngOnInit() {
    // snapshot : etat a l'instant t, paramMap list des parametres données ds l'url
    let id = this.actRoute.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.article = this.articleSrv.getById(id) }, 2000 );


  }

}
