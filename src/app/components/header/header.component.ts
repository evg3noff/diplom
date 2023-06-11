import { Component, OnInit } from '@angular/core';
import { getFromSessionStorage } from 'src/app/utils/session-storage';

export interface UserInfo {
  email: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
