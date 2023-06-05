import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authorisation-page',
  templateUrl: './authorisation-page.component.html',
  styleUrls: ['./authorisation-page.component.scss']
})
export class AuthorisationPageComponent implements OnInit, OnDestroy {

  registration: boolean = false;
  unsubscribe$: Subject<void> = new Subject<void>();

  loginObject = {
    name: '',
    password: ''
  }

  regObj = {
    name: '',
    password: '',
    email: ''
  }

  failLogin: boolean = false;
  errMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ){}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    if(this.route.snapshot.routeConfig?.path === 'registration') this.registration = true;
  }

  submitLogin() {
    this.http.get(environment.apiUrl + 'auth/signin', {
      params: this.loginObject
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/', 'personal-member']);
        },
        error: (err) => {
          alert(err.error.values.message);
        }
      })
  }

  switchReg(): void {
    this.registration = !this.registration;
  }

  reg(): void {
    this.http.post(environment.apiUrl + 'auth/signup', {
      ...this.regObj
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/', 'personal-member']);
        },
        error: (err) => {
          alert(err.error.values.message);
        }
      })
  }
}
