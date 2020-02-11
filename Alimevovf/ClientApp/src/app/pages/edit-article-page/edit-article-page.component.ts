import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'ck-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.css']
})
export class EditArticlePageComponent implements OnInit {
  public article: Article;

  constructor(
    private articleSrv: ArticleService) {

  }

  ngOnInit() {
    /*let article = this.articleSrv.getById("1");
    if (article) {
      this.article = article;
    }
    else
    {
      this.article = new Article();
    }*/
  }

}
