import { Component, OnInit } from "@angular/core";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { UploadFileService } from "app/services/File.service";
import { Observable } from "rxjs";
declare var $: any;

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
  images: any = [];
  allfiles: any = [];
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = "";
  tag: string;
  dep: string;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService
      .OnUpload(this.currentFile, this.tag, this.dep)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = "Image uploaded successfully";
        } else {
          this.message = "Image not uploaded successfully";
        }
      });

    this.selectedFiles = undefined;
  }
  showNotification(from, align) {
    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "notifications",
        message: "Fichier Ajouté avec succès",
      },
      {
        type: "success",
        timer: 4000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }
}
