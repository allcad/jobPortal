import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
  	this._router.navigate(['./home'], {relativeTo: this._routes});
  }

}
