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
    let data: any = {}
    data.title = article.title;
    data.picture = article.picture;
    data.body = article.body;
    /*params.dateOfCreation = article.creationDate;
    params.dateOfModification = article.lastModification;*/
    data.cookUser = article.fkCookUser;
    console.log(data);
    return this.http.post("/api/article/createtest", { body :data });
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

