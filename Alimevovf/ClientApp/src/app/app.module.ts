import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { modalTestComponent } from './modalTest/modalTest.component';
import { footerComponent } from './footer/footer.component';
import { mentionlegalesComponent } from './mentionlegales/mentionslegales.component';
import { HeaderComponent } from './header/header.component';
import { buttonAccesComponent } from './buttonAcces/buttonAcces.component';

import { partenaireComponent } from './partenaire/partenaire.component';
import { HeaderPresentationComponent } from './headerPresentation/headerPresentation.component';
import { PresentationArticleComponent } from './PresentationArticle/PresentationArticle.component';
import { ModalComponent } from './modal/modal.component';
import { ModalConnexionComponent } from './modalConnexion/modalConnexion.component';
import { ServerComponent } from './server/server.component';
import { CategorieComponent } from './categorie/categorie.component';
import { BlogService } from './services/blog.service';
import { ArticleService } from './services/article.service';


import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  
  { path: '', component: MainPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'article/:id', component: ArticlePageComponent },
  { path: 'mentionslegales', component: mentionlegalesComponent },
  {
    path:'article/edit/:id',
    component: EditArticlePageComponent,
    canActivate: [IsAdminGuard],
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    modalTestComponent,
    partenaireComponent,
    footerComponent,
    CategorieComponent,
    mentionlegalesComponent,
    ModalComponent,
    ModalConnexionComponent,
    ServerComponent,
    CardsComponent,
    PresentationArticleComponent,
    HeaderPresentationComponent,
    HeaderComponent,
    PageNotFoundComponent,
    MainPageComponent,
    BlogPageComponent,
    buttonAccesComponent,
    ArticlePageComponent,
    EditArticlePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  providers: [
    BlogService,
    ArticleService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
