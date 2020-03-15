import { Component, OnInit } from "@angular/core";
import { User } from "app/services/User";
import { UserService } from "app/services/User.service";
import { Router } from "@angular/router";
import { Observable, interval, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UserDetailsComponent } from "app/user-details/user-details.component";

@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"]
})
export class TableListComponent implements OnInit {
  users = [];
  UsersTest = [];
  userToUpdate: any;
  private updateSubscription: Subscription;
  isPopupOpened = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private matdialog?: MatDialog
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userService
      .getUsersList()
      .pipe(map(arr => arr && arr.filter(r => r.active == true)))
      .subscribe(result => {
        this.users = result;
      });
  }

  deleteEmployee(id: number) {
    this.userService.deleteUser(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error)
    );
  }

  employeeDetails(id: number) {
    this.router.navigate(["details", id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(["update", id]);
  }
  OnCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "30%";

    this.matdialog.open(UserDetailsComponent, dialogConfig);
  }
  OnEdit(id: number) {
    this.isPopupOpened = true;
    this.userService
      .getUsersList()
      .pipe(map(arr => arr.filter(r => r.active == true)))
      .subscribe(users => {
        this.UsersTest = users;
        const userToUpdate = users.find(c => c.id === id);

        const dialogRef = this.matdialog.open(UserDetailsComponent, {
          data: userToUpdate
        });
        dialogRef.afterClosed().subscribe(result => {
          this.isPopupOpened = false;
          this.reloadData();
        });
      });
  }
}
