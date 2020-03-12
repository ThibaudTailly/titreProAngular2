import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'ck-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  public articles: Article[];

  constructor(
    private articleSrv: ArticleService
  ) {

  }

  ngOnInit() {
    this.articleSrv.getAllArticles().subscribe(
      (data: any) => {
        console.log(data)

        this.articles = [];
        for (let dArticle of data) {
          let article: Article = new Article();

          article.id = dArticle["id"];
          article.title = dArticle["title"];
          article.body = dArticle["body"];
          article.picture = dArticle["picture"];
          article.creationDate = new Date(dArticle["creationDate"]);
          article.lastModification = new Date(dArticle["lastModification"]);
          article.abstract = dArticle["abstract"];
          this.articles.push(article);
        }
        console.log(this.articles);
      },
      (error: any) => {
        console.error(error)
      });

  }
}
