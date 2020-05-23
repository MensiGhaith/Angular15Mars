import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UploadFileService } from "app/services/File.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-file-details",
  templateUrl: "./file-details.component.html",
  styleUrls: ["./file-details.component.scss"],
})
export class FileDetailsComponent implements OnInit {
  public myROLES: any;
  removable = true;

  visible = true;
  selectable = true;
  Act: any;

  public _contactForm: FormGroup;
  updateSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private FileService: UploadFileService,
    private dialogRef: MatDialogRef<FileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      id: [this.data.id],
      active: [this.data.active, [Validators.required]],
      nom: [this.data.nom, [Validators.required]],
      type: [{ value: this.data.type, disabled: true }, [Validators.required]],
      tag: [this.data.tag, [Validators.required]],
    });
    this.Act = this.data.active;
  }

  onSubmit() {
    const MydATA = this._contactForm.value;

    this.FileService.updateFile(MydATA.id, MydATA).subscribe(
      (data) => {
        console.log(data);

        this.dialogRef.close();
      },
      (error) => alert(error.error.message)
    );
  }
}
