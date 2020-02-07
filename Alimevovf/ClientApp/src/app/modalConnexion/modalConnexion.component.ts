import { Component,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-modalConnexion',
  templateUrl: './modalConnexion.component.html',
  styleUrls: ['./modalConnexion.component.css']
})

export class ModalConnexionComponent implements AfterViewInit{
  @ViewChild("ckmodal", { static: true })
  modal: ElementRef

  connectionForm = new FormGroup({
    pseudo: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required])
  }
  ) 

  constructor(private authSrv:AuthService) {
    
  }

  ngAfterViewInit()
  {

    console.log(this.modal.nativeElement)
  }
  ck_click() {
    this.modal.nativeElement.className = "modal fade show"
    this.modal.nativeElement.style = "display:block"
  }
  ck_close() {
    this.modal.nativeElement.className = "modal fade"
    setTimeout(
      () => { this.modal.nativeElement.style = "display:none" },
      150)
  }
  ck_save() {
    this.modal.nativeElement.className = "modal fade"
    this.modal.nativeElement.style = "display:none"
  }
  onSubmit()
  {
    this.authSrv.signIn(
      this.connectionForm.get('pseudo').value,
      this.connectionForm.get('password').value
    )
    this.ck_close();
  }
}
