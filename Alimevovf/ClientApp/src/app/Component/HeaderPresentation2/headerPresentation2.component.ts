import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-headerPresentation2',
  templateUrl: './headerPresentation2.component.html',
  styleUrls: ['./headerPresentation2.component.css']
})

export class HeaderPresentation2Component {
  @Input() users: User[]
}
