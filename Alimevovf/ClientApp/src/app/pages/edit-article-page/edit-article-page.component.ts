import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FileUploader } from 'ng2-file-upload';


declare var Quill;
const uploadAPI = 'http://localhost:4000/api/upload';
@Component({
  selector: 'ck-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.css'],
  providers: [DatePipe] // injectable service
})
export class EditArticlePageComponent implements OnInit,AfterViewInit {
 
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  public article: Article
  public saved: boolean = false
  @ViewChild('banner', { static: false }) myId: ElementRef;
  @ViewChild('quillcontainer', { static: false })
  quillContainer: ElementRef

  quillEditor: any



  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private authSrv: AuthService,
    private articleSrv: ArticleService, // une instance injecté du service articlesrv
    public datepipe: DatePipe) {

  }

  ngOnInit()
  {
    document.getElementById("container").style.backgroundImage = "url(/assets/Ecriture.jpg)";
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded successfully:', item, status, response);
      alert('Article a bien été ajouté');
    };

   
    //recuperation id
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.article = new Article();
    if (!id) {
      return  
    }
   
    this.articleSrv.getById(id).subscribe(
      (data: any) => {
        
        let article: Article = new Article();
        article.id = data["id"];
        article.title = data["title"];
        article.body = data["body"];
        article.picture = data["picture"];
        article.creationDate = new Date(data["dateOfCreation"]);
        article.lastModification = new Date(data["dateOfModification"]);
        console.log(data);
        article.fkCookUser = data["fkCookUser"];

        this.article = article;
        this.updateQuill();
        console.log(this.article)
      },
      (error: any) => { console.error(error) }
    );

  }
  ngAfterViewInit() {
    let options = {
      debug: 'info',
      
      placeholder: 'Compose an epic...',
      readOnly: false,
      theme: 'snow'
    }
    this.quillEditor = new Quill(this.quillContainer.nativeElement, options);
    this.updateQuill();
    console.log(this.quillEditor)
  }
  updateQuill() {
    if (!this.article || !this.quillEditor) {
      return false
    }
    this.quillEditor.setContents(JSON.parse(this.article.body))
    return true
  }

  formatDate(date: Date) {
    
    return this.datepipe.transform(date, 'dd/MM/yyyy')
  }

  saveArticle() {
    this.article.body = JSON.stringify(this.quillEditor.getContents());
    if (!this.article.id) {
      this.article.fkCookUser = this.authSrv.user.id;
      this.articleSrv.create(this.article)
        .subscribe( //methode asynchrone
          (data: any) => {
            this.saved = true;
            setTimeout(() => { this.saved = false }, 4000)
            
            console.log(data)
          },
          (error: any) => { console.error(error) }
      );
      
    }
    else {
      this.articleSrv.update(this.article).subscribe(
        (data: any) => {
          //renvoyer l'id de l'article au lieu d'un boolean
          console.log(data)
        },
        (error: any) => { console.error(error) }
      );
    }

  }
  deleteArticle() {
    this.articleSrv.deleteArticleById(this.article.id).subscribe(
      (data: any) => {
        this.router.navigate(["/blog"]);
      //renvoyer l'id de l'article au lieu d'un boolean
        console.log(data)

      },
      (error: any) => { console.error(error) }
    );
  }
}
  

