import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "app/services/token-storage.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "app/services/User.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  public _contactForm: FormGroup;
  Act: any;
  constructor(
    private userSeervice: UserService,
    private tokenStorage: TokenStorageService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.tokenStorage.getUser().id;
    this.userSeervice.getUser(id).subscribe(data => {
      this._contactForm = this._formBuilder.group({
        id: [data.id],
        nom: [data.nom, [Validators.required]],
        prenom: [data.prenom, [Validators.required]],
        email: [{ value: data.email, disabled: true }, [Validators.required]],
        active: [data.active, [Validators.required]],

        username: [
          { value: data.username, disabled: true },
          [Validators.required]
        ]
      });
      this.Act = data.active;
    });
  }
  update() {
    const MydATA = this._contactForm.value;
    this.userSeervice.updateEmployee(MydATA.id, MydATA).subscribe(data => {
      location.reload();
      console.log(data);
    });
  }
}
