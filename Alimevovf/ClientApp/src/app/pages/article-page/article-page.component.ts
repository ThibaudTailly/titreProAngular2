import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { AuthService } from '../../services/auth.service';

declare var Quill;
@Component({
  selector: 'ck-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit, AfterViewChecked {

  article: Article = null
  
  @ViewChild('quillcontainer', { static: false })
  quillContainer: ElementRef

  quillEditor: any

  constructor(
    //service qui va gerer les informations de l'url 
    private actRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private authSrv: AuthService
    ) {
   
  }

  
  ngOnInit()
  {
    // snapshot : etat a l'instant t, paramMap list des parametres données ds l'url
    let id = this.actRoute.snapshot.paramMap.get('id');
    //subscribe: 
    this.articleSrv.getById(id).subscribe(
      (data: any) => {
        console.log(data)
        let article: Article = new Article();
        article.id = data["id"];
        article.title = data["title"];
        article.body = data["body"];
        article.picture = data["picture"];
        article.creationDate = new Date(data["creationDate"]);
        article.lastModification = new Date(data["lastModification"]);
        article.abstract = data["abstract"];

        this.article = article;
        this.createQuill()
        this.updateQuill()
      },
      (error: any) => { console.error(error) }
    );
    
  }
  ngAfterViewChecked() {
    this.createQuill()
  }
  createQuill() {
    if (this.quillEditor) return true
    if (!this.quillContainer) return false
    
    let options = {
      debug: 'warn',
      placeholder: '',
      readOnly: true
      
    }
    this.quillEditor = new Quill(this.quillContainer.nativeElement, options);
    this.updateQuill()
    console.log(this.quillEditor)
    return true
  }
  updateQuill() {
    if (!this.article || !this.quillEditor) {
      return false
    }
    this.quillEditor.setContents(JSON.parse(this.article.body))
    return true
  }

  isAdmin() {
    return this.authSrv.isAdmin();
  }

}
