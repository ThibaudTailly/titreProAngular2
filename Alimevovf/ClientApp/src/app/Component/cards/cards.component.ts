import { Component,Input } from '@angular/core';
import { Article } from '../../models/article';



@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent {
  @Input() articles: Article[] // la variable blogs vient de l'exterieur
 

  constructor(
  ) {

  } 
}

