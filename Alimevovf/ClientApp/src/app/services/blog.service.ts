import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs: any[] = []

  constructor() { }

  getAllBlogs()
  {
    this.blogs.length = 0
    //call a l'api
    this.blogs.push({
      title: "Mon titre",
      content: "Loremp ipsum<br/>Doloret si t amet"
    })

    return this.blogs
  }

} 
