import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {
  
  @Input() userData = {
    Username: "",
    Password: ""
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    console.log("clicked");
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", result.Username);
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }
}
