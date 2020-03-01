import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'ck-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public articles: Article[];

  constructor(
    private articleSrv: ArticleService
  ) {

  }

  ngOnInit() {
    this.articleSrv.getArticles(6,1,"id",false).subscribe(
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
          this.articles.push(article);
        }
        console.log(this.articles);
      },
      (error: any) => {
        console.error(error)
      });

  }
}
