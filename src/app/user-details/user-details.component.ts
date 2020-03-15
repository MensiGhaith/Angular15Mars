import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild
} from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserService } from "app/services/User.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Subscription, interval, Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserDetailsComponent implements OnInit {
  public myROLES: any;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  RoleCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  visible = true;
  selectable = true;
  allRoles: string[] = ["GP", "DATAHUB", "COMET", "ADMIN", "USER"];

  public _contactForm: FormGroup;
  updateSubscription: Subscription;
  @ViewChild("roleInput", { static: false }) roleInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;
  constructor(
    private _formBuilder: FormBuilder,
    private userSERVICE: UserService,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filteredRoles = this.RoleCtrl.valueChanges.pipe(
      startWith(null),
      map((role: string | null) =>
        role ? this._filter(role) : this.allRoles.slice()
      )
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      id: [this.data.id],
      active: [this.data.active, [Validators.required]],
      nom: [this.data.nom, [Validators.required]],
      prenom: [this.data.prenom, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      roles: []
    });
    this.myROLES = this.data.roles;
  }

  onSubmit() {
    const MydATA = this._contactForm.value;
    var role = new Array();
    if (MydATA.roles == null) {
      MydATA.roles = this.myROLES;
    } else {
      role.push(MydATA.roles);

      MydATA.roles = role;
    }

    this.userSERVICE.updateEmployee(MydATA.id, MydATA).subscribe(
      data => {
        console.log(data);

        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
  remove(aRole: string): void {
    const index = this.myROLES.indexOf(aRole);

    if (index >= 0) {
      this.myROLES.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our role
    if ((value || "").trim()) {
      this.myROLES.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.RoleCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.myROLES.push(event.option.viewValue);
    this.roleInput.nativeElement.value = "";
    this.RoleCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRoles.filter(
      role => role.toLowerCase().indexOf(filterValue) === 0
    );
  }
  Delete(id: number, role: String) {
    this.userSERVICE.deleteRole(id, role).subscribe(data => {
      console.log(data);
    });
  }
}
