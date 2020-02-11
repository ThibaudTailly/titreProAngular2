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
}

