import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  }

  isLoginFailed =  false;
  isLoggedIn = false;
  errorMessage = "There was an error!"

  constructor(
      private authService: AuthService, 
      private tokenStorage: TokenStorageService, 
      private router: Router) { }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        let successEvent = data.success;
        if(successEvent == false)
        {
          console.log("THE USER DOESN'T EXIST");
          this.isLoginFailed = true;

        }
        
        if(successEvent == true)
        {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data.user);
          console.log(data.user)
          this.isLoginFailed = false;
          console.log("THE USER EXISTS AND HAS BEEN LOGGED IN");
          this.goToHome();
        }

        
  
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }

  goToHome(): void {
    this.router.navigate(['/']).then(() => window.location.reload());
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
    }
  }

}
