import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username?: string;

  constructor(private tokenStorage: TokenStorageService) {}

  //Loggged in does not validate the user being logged in
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user: any = this.tokenStorage.getUser();
      this.username = user.username;
    }
  }
  logOut(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
