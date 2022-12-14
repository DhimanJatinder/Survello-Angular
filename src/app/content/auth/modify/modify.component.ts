import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  isSuccessfull = true;
  isNotChanged = false;
  isLoggedIn = false;
  errorMessage = '';

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService,private route: ActivatedRoute, private router: Router) {}


  person: any = {
    uniqueId : null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    username: null,
    password: null,
    confirmPassword: null,
  };


 ngOnInit(): void {

  this.isLoggedIn = !!this.tokenStorage.getToken();
      if(this.isLoggedIn)
      {
        const user: any = this.tokenStorage.getUser();
        let x = user.displayName;
        
        this.person.username = user.username;
        this.person.firstName  = x.slice(0, x.length/2);
        this.person.lastName = x.slice(x.length/2, x.length);
        this.person.emailAddress = user.emailAddress;
      }
  }

  /*
  onSubmit(): void {
    const { uniqueId, firstName, lastName, emailAddress, username, password } = this.form;
    this.authService
      .register(uniqueId, username, password, emailAddress, firstName + lastName)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isSignedUpFailed = false;
          this.goToHome();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignedUpFailed = true;
          this.errorMessage = 'Sign up failed. Please try again...';
        },
      });

  }
  */
  onSubmit():void {

  }
}
