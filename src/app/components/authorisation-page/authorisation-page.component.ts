import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authorisation-page',
  templateUrl: './authorisation-page.component.html',
  styleUrls: ['./authorisation-page.component.scss']
})
export class AuthorisationPageComponent implements OnInit {

  registration: boolean = false;

  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    if(this.route.snapshot.routeConfig?.path === 'registration') this.registration = true;
  }

  
}
