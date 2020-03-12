import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  readonly httpOptions = {
    headers: new HttpHeaders({
    "Content-Type":"application/json"
    })
  } 

  //Injection du service httpClient  
  constructor(private http:HttpClient) { }

  getById(id: string) {
    return this.http.get("/api/article/" + id) //creer un obj observable
  }
  create(article: Article){
    let darticle: any = {}
    darticle.Title = article.title;
    darticle.Picture = article.picture;
    darticle.Body = article.body;
    darticle.Abstract = article.abstract;

    darticle.FK_cook_user = article.fkCookUser;
    console.log(darticle);
    return this.http.post("/api/article/create",  darticle );
  }
  update(article: Article) {
    let darticle: any = {}
    darticle.Id = article.id;
    darticle.Title = article.title;
    darticle.Picture = article.picture;
    darticle.Body = article.body;
    darticle.Abstract = article.abstract;

    darticle.FK_cook_user = article.fkCookUser;
    console.log(darticle);
    return this.http.post("/api/article/update", darticle);
  }
  getArticles(amount: number, page: number, order: string, asc: boolean) {
    let queryParams = `?amount=${amount}&page=${page}&order=${order}&asc=${asc}`;
    return this.http.get("/api/article" + queryParams)
  }
  getAllArticles() {
    return this.http.get("/api/article/all")
  }
  deleteArticleById(id: string) {
    return this.http.delete("/api/article/" + id);
  }
}

