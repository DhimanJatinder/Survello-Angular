import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName = null;
  displayName = null;
  id = null;

  constructor(private tokenStorage: TokenStorageService) {}

  //Loggged in does not validate the user being logged in
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user: any = this.tokenStorage.getUser();
      console.log(user);
      this.userName = user.username;
      this.displayName = user.displayName;
      this.id = user.id;
      
      console.log(this.displayName, this.userName, this.id);
    }
  }
  logOut(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
