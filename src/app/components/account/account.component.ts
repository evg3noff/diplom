import { Component, OnInit } from '@angular/core';
import { getFromSessionStorage } from 'src/app/utils/session-storage';
import { UserInfo } from '../header/header.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  userInfo: UserInfo;

  constructor(){
  }

  ngOnInit(): void {
    try {
      let userInfo = getFromSessionStorage<UserInfo>('User');
      if(userInfo) {
        this.userInfo = userInfo;
      }
    } catch {
      console.log('не авторизовано');
    }
  }

}
