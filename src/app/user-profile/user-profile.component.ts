import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }
  /**
   * Call API method to get user data
   * @returns user data
   */
  getUserData(): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.userData = resp;
      console.log(this.userData);
      return this.userData;
    });
  }
  /**
   * Open dialog to edit user
   */
  editUserDialog(): void {
    this.dialog.open(EditUserFormComponent, {
      width: "300px"
    });
  }
  /**
   * Calls API method to delete user profile
   */
  deleteUser(): void{
    const username = localStorage.getItem("user") || "";
    if (
      confirm("You are about to delete your profile. This cannot be undone.")
    ) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackBar.open("User has been successfully deleted", "OK", {
          duration: 2000
        });
      });
      this.fetchApiData.deleteUser(username).subscribe((resp: any) => {
        localStorage.clear;
      });
    }
  }

}
