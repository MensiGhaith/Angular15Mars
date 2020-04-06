import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { File } from "data-model/fichiers.model";
import { UploadFileService } from "app/services/File.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from "@angular/material";
import { FileDetailsComponent } from "app/file-details/file-details.component";
declare var $: any;

@Component({
  selector: "app-afficher",
  templateUrl: "./afficher.component.html",
  styleUrls: ["./afficher.component.scss"],
})
export class AfficherComponent implements OnInit {
  SearchTag: String;
  files = [];
  filtered: {}[];
  p: number;
  retrieveResonse: any;
  base64Data: any;
  retrievedFile: any;
  FilesTest = [];
  fileToUpdate: any;

  isPopupOpened = true;

  constructor(
    private sanitizer: DomSanitizer,
    private uploadService: UploadFileService,
    private matdialog?: MatDialog
  ) {}
  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.uploadService.getFilesList().subscribe((data) => {
      this.files = data;
      this.filtered = this.files.slice();
    });
  }

  Search() {
    this.filtered = this.files.filter((file) => {
      if (!this.SearchTag) {
        return true;
      }
      if (file.tag === "undefined") {
        return file.nom
          .toLocaleLowerCase()
          .includes(this.SearchTag.toLocaleLowerCase());
      } else {
        return file.tag
          .toLocaleLowerCase()
          .includes(this.SearchTag.toLocaleLowerCase());
      }
    });
  }
  onPageChange(page: number) {
    this.p = page;
  }
  GetByTag(tag: string) {
    this.uploadService.getFile(tag).subscribe((res) => {
      this.retrieveResonse = res;
      this.base64Data = this.retrieveResonse.fileContent;
      if (
        this.retrieveResonse.fileType == "jpg" ||
        this.retrieveResonse.fileType == "PNG" ||
        this.retrieveResonse.fileType == "jpeg"
      ) {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "image/jpg",
        });
        const url = URL.createObjectURL(blob);

        this.retrievedFile = window.open(url);
      } else if (this.retrieveResonse.fileType == "pdf") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "application/pdf",
        });

        // const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.url1 = this._base64ToArrayBuffer(url2);

        const url = URL.createObjectURL(blob);

        this.retrievedFile = window.open(url, this.retrieveResonse.fileName);
      } else if (this.retrieveResonse.fileType == "docx") {
        var blob = new Blob([this.base64Data], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        // const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.url1 = this._base64ToArrayBuffer(url2);
        const url = URL.createObjectURL(blob);
        const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);

        this.retrievedFile = window.open(url);
        /* this.retrievedFile = window.open(
    "https://docs.google.com/viewer?url=" +
      url +
      "&pid=explorer&efh=false&a=v&chrome=false&embedded=true"
  ); */
      } else if (this.retrieveResonse.fileType == "mp4") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/mp4",
        });
        // const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.url1 = this._base64ToArrayBuffer(url2);

        const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.retrievedFile = window.open(url);
      } else if (this.retrieveResonse.fileType == "pptx") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type:
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        });
        // const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.url1 = this._base64ToArrayBuffer(url2);

        const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.retrievedFile = window.open(url);
      } else {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "text/plain",
        });

        // const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.url1 = this._base64ToArrayBuffer(url2);

        const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.retrievedFile = window.open(url);
      }
    });
  }
  _base64ToArrayBuffer(base64) {
    const binary_string = window.atob(this.base64Data);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  OnEdit(id: number) {
    this.isPopupOpened = true;
    this.uploadService.getFilesList().subscribe((files) => {
      this.FilesTest = files;
      const userToUpdate = files.find((c) => c.id === id);

      const dialogRef = this.matdialog.open(FileDetailsComponent, {
        data: userToUpdate,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.isPopupOpened = false;
        this.reloadData();
      });
    });
  }
  deleteFile(id: number) {
    this.uploadService.deleteFile(id).subscribe(
      (data) => {
        console.log(data);
        this.reloadData();
      },
      (error) => console.log(error)
    );
  }
  showNotification(from, align) {
    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "notifications",
        message: "Fichier Supprimé avec succès",
      },
      {
        type: "danger",
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
