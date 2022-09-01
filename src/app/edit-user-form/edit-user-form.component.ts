import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
  @Input() userData: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Call API method to update user
   */
  editUser(): void {
    console.log(this.userData);
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.updateUser(username, this.userData).subscribe((resp: any) => {
      this.dialogRef.close();
      localStorage.clear;
      this.snackBar.open("User data has been updated!  Please login again with your new credentials","OK", {
        duration: 2000
      });
      this.router.navigate(["welcome"]);
    });
  }

}
