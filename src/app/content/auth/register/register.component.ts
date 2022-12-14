import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isSignedUpFailed = false;
  errorMessage = '';

  form: any = {
    uniqueId: Date.now(),
    firstName: null,
    lastName: null,
    emailAddress: null,
    username: null,
    password: null,
    confirmPassword: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

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

  goToHome(): void {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
}
