import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardsComponent } from './Component/cards/cards.component';
import { footerComponent } from './Component/footer/footer.component';
import { mentionlegalesComponent } from './Component/mentionlegales/mentionslegales.component';
import { HeaderComponent } from './Component/header/header.component';
import { buttonAccesComponent } from './Component/buttonAcces/buttonAcces.component';
import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';

import { partenaireComponent } from './Component/partenaire/partenaire.component';
import { HeaderPresentationComponent } from './Component/HeaderPresentation/headerPresentation.component';
import { HeaderPresentation2Component } from './Component/HeaderPresentation2/headerPresentation2.component';
import { PresentationArticleComponent } from './Component/PresentationArticle/PresentationArticle.component';
import { ModalComponent } from './Component/modal/modal.component';
import { ModalConnexionComponent } from './Component/modalConnexion/modalConnexion.component';
import { ServerComponent } from './server/server.component';
import { CategorieComponent } from './Component/categorie/categorie.component';
import { BlogService } from './services/blog.service';
import { ArticleService } from './services/article.service';
import { FileUploadModule } from 'ng2-file-upload';


import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { IsAdminGuard } from './Component/guards/is-admin.guard';

const routes: Routes = [

  { path: '', component: MainPageComponent },
  { path: 'blog', component: BlogPageComponent },

  { path: 'mentionslegales', component: mentionlegalesComponent },
  {
    path:'article/edit',
    component: EditArticlePageComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'article/edit/:id',
    component: EditArticlePageComponent,
    canActivate: [IsAdminGuard],
  },
  { path: 'article/:id', component: ArticlePageComponent },
  {
    path: 'admin', component: AdminPageComponent,
    canActivate: [IsAdminGuard],
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    NavMenuComponent,
    AppComponent,
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
    HeaderPresentation2Component,
    HeaderComponent,
    PageNotFoundComponent,
    MainPageComponent,
    BlogPageComponent,
    buttonAccesComponent,
    ArticlePageComponent,
    EditArticlePageComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  providers: [
    BlogService,
    ArticleService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
