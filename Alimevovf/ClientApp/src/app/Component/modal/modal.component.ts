import { Component,ViewChild,ElementRef,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
   
})

export class ModalComponent {
  @ViewChild("ckmodal", { static: true })
  modal: ElementRef

 
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
