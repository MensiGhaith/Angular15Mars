import { Component, OnInit } from "@angular/core";
import { User } from "app/services/User";
import { UserService } from "app/services/User.service";
import { Router } from "@angular/router";
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormGroup
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  submitted = false;
  constructor(private userService: UserService, private router: Router) {}
  hide = true;
  model: any = {};

  ngOnInit() {}
  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }
  save() {
    var role = new Array();
    role.push(this.user.roles);
    this.user.roles = role;
    this.userService.createUser(this.user).subscribe(
      data => {
        alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user, null, 4));
        this.submitted = true;
        this.gotoList();
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    this.save();
  }

  gotoList() {
    this.router.navigate(["/table-list"]);
  }
}
