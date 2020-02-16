import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  //Injection du service httpClient  
  constructor(private http:HttpClient) { }

  getById(id: string) {
    return this.http.get("/api/article/" + id)
  }
  create(article: Article) {
    let params: any = {}
    params.title = article.title;
    params.picture = article.picture;
    params.Body = article.body;
    /*params.dateOfCreation = article.creationDate;
    params.dateOfModification = article.lastModification;*/
    params.fk_cook_user = article.fkCookUser;
    return this.http.post("/api/article/create", params);
  }
}

