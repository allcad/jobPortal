import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractor-reset-password',
  templateUrl: './contractor-reset-password.component.html',
  styleUrls: ['./contractor-reset-password.component.css']
})
export class ContractorResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

}
