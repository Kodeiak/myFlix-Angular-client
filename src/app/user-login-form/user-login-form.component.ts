import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {
  
  @Input() userData = { username: "", password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.username);
        this.snackBar.open(result, "OK", {
          duration: 2000
        });
        this.router.navigate(["movies"]);
      }, 
      (result) => {
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 2000
        });
      }
    );
  }
}
