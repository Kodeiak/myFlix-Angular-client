import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})

/**
 * Create welcome page 
 */
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
  }

  /**
   * Open registration form
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: "280px"
    });
  }

    /**
   * Open login form
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "300px"
    });
  }
}
