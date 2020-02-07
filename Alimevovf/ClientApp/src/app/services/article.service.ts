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
    this.http.get("localhost:44358/api/article").subscribe(
      (data: any) => { console.log(data) },
      (error: any) => { console.error(error) }
      )
    return new Article();
  }
}

