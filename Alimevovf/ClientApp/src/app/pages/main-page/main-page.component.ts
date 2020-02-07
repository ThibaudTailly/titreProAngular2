import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'ck-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    private blogSvr : BlogService  
  ) { }

  ngOnInit() {
    console.log(this.blogSvr.getAllBlogs())
  }

  get blogs() {
    return this.blogSvr.blogs
  }
}
