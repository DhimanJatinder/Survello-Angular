import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {
  isSuccessfull = true;
  isNotChanged = false;
  isLoggedIn = false;
  errorMessage = '';
  id = '';

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  person: any = {
    uniqueId: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    username: null,
    password: null,
    confirmPassword: null,
  };

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user: any = this.tokenStorage.getUser();
      let x: String = user.displayName;
      let names = x.split(' ');
      //console.log(names);
      this.person.uniqueId = user.id;
      this.person.username = user.username;
      this.person.firstName = names[0];
      this.person.lastName = names[1];
      this.person.emailAddress = user.emailAddress;
      console.log(user);
    }
  }

  onSubmit(): void {
    console.log(this.person);

    const displayName: string = this.person.firstName + this.person.lastName;

    this.authService.modify(this.person, this.person.uniqueId).subscribe({
      next: () => {
        this.isSuccessfull = true;
        this.isNotChanged = true;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSuccessfull = false;
      },
    });
  }
}
