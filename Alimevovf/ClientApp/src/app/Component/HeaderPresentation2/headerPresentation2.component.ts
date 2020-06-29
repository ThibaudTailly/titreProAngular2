import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-headerPresentation2',
  templateUrl: './headerPresentation2.component.html',
  styleUrls: ['./headerPresentation2.component.css']
})

export class HeaderPresentation2Component {
  @Input() users: User[]
  constructor(
    private authSrv: AuthService
  ) {}

  updateUser(user: User) {
    this.authSrv.updateUser(user).subscribe(
      (data: any) => {
        console.log(data)
      },
      (error: any) => { console.error(error) }
    );
  }
}

//document.getElementById("container").style.backgroundImage = "url(/assets/Ecriture.jpg)";
