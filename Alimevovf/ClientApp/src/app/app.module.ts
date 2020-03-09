import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardsComponent } from '../app/Component/cards/cards.component';
import { footerComponent } from '../app/Component/footer/footer.component';
import { mentionlegalesComponent } from '../app/Component/mentionlegales/mentionslegales.component';
import { HeaderComponent } from '../app/Component/header/header.component';
import { buttonAccesComponent } from '../app/Component/buttonAcces/buttonAcces.component';

import { partenaireComponent } from '../app/Component/partenaire/partenaire.component';
import { HeaderPresentationComponent } from '../app/Component/headerPresentation/headerPresentation.component';
import { HeaderPresentation2Component } from '../app/Component/headerPresentation2/headerPresentation2.component';
import { PresentationArticleComponent } from '../app/Component/PresentationArticle/PresentationArticle.component';
import { ModalComponent } from '../app/Component/modal/modal.component';
import { ModalConnexionComponent } from '../app/Component/modalConnexion/modalConnexion.component';
import { ServerComponent } from './server/server.component';
import { CategorieComponent } from '../app/Component/categorie/categorie.component';
import { BlogService } from './services/blog.service';
import { ArticleService } from './services/article.service';


import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { IsAdminGuard } from '../app/Component/guards/is-admin.guard';

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
  { path: 'article/:id/', component: ArticlePageComponent },
  {
    path: 'admin', component: AdminPageComponent,
    canActivate: [IsAdminGuard],
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
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
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  providers: [
    BlogService,
    ArticleService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
