import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "app/services/User";
import { UserService } from "app/services/User.service";
import { filter } from "rxjs-compat/operator/filter";
import { map } from "rxjs/operators";

@Component({
  selector: "app-en-attente",
  templateUrl: "./en-attente.component.html",
  styleUrls: ["./en-attente.component.scss"]
})
export class EnAttenteComponent implements OnInit {
  users = [];

  users1 = [];

  user: User = new User();

  constructor(private userService: UserService) {}
  reloadData() {
    this.userService
      .getUsersList()
      .pipe(map(arr => arr && arr.filter(r => r.active == false)))
      .subscribe(result => {
        this.users = result;
      });
  }
  Update(id: number) {
    this.userService.AcceptUser(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.reloadData();
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
}
