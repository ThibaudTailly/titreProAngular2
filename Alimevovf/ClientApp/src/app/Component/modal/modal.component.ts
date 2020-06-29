import { Component,ViewChild,ElementRef,AfterViewInit, OnInit, Input } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../models/PasswordValidator';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
 
   
})

export class ModalComponent implements OnInit{
  submitted = false
  registerForm: FormGroup;
  signupForm = new FormGroup({
  /*pseudo: new FormControl('', [Validators.required]),*/
    password: new FormControl('', [Validators.required, PasswordValidator.getFormValidator()]),
    password2: new FormControl('', [Validators.required, PasswordValidator.getFormValidator()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])

   
  })



 
  @ViewChild("ckmodal", { static: true })
  modal: ElementRef

  constructor(
    private actRoute: ActivatedRoute,
    private auth:AuthService) { }

  ngOnInit() {
  
  }

  ck_click() {
    this.signupForm.reset()
    this.modal.nativeElement.className = "modal fade show"
    this.modal.nativeElement.style = "display:block"
  }
  ck_close() {
    this.modal.nativeElement.className = "modal fade"
    setTimeout(
      () => { this.modal.nativeElement.style = "display:none" },
      150)
  }

  get passwordConfirmation() {
    return this.signupForm.get('password').value == this.signupForm.get('password2').value
  }

  get formValidation() {
    return this.signupForm.valid && this.passwordConfirmation
  }
  get mailValidation() {
    return this.signupForm.get('email').valid;
  }
  onSubmit() {
    //this.modal.nativeelement.classname = "modal fade"
    //this.modal.nativeelement.style = "display:none"
    this.submitted = true;
    let user = new User()
    user.email = this.signupForm.get('email').value
    user.firstname = this.signupForm.get('firstName').value
    user.lastname = this.signupForm.get('name').value
    user.password = this.signupForm.get('password').value

    this.auth.signUp(user).subscribe(
      (data: any) => {
        console.log(data)
      },
      (error: any) => {
        console.error(error)
      }

    )
  }
}
