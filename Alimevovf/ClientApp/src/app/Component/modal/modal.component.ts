import { Component,ViewChild,ElementRef,AfterViewInit, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
 
   
})

export class ModalComponent implements OnInit{
  @Input() user: AuthService[]
 
  @ViewChild("ckmodal", { static: true })
  modal: ElementRef
  constructor(
    private actRoute: ActivatedRoute,
    private Auth:AuthService) { }

  ngOnInit() {
    this.Auth = new AuthService();
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
}
