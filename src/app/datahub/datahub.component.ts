import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "app/services/token-storage.service";
import { Router } from "@angular/router";
import { File } from "data-model/fichiers.model";
import { UploadFileService } from "app/services/File.service";
import { map } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-datahub",
  templateUrl: "./datahub.component.html",
  styleUrls: ["./datahub.component.scss"],
})
export class DatahubComponent implements OnInit {
  retrieveResonse: any;
  base64Data: any;
  retrievedFile: any;
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private uploadService: UploadFileService,
    private sanitizer: DomSanitizer
  ) {}

  SearchTag: String;
  files = [];
  filtered: {}[];
  p: number;

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.uploadService
      .getFilesList()
      .pipe(
        map(
          (arr) =>
            arr &&
            arr.filter((r) => r.departement == "datahub" && r.active == true)
        )
      )
      .subscribe((result) => {
        this.files = result;
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
        this.retrieveResonse.fileType.toLocaleLowerCase() == "jpg" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "png" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "jpeg"
      ) {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "image/JPG",
        });
        const url = URL.createObjectURL(blob);

        this.retrievedFile = window.open(url);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "pdf") {
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
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "mp4") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/mp4",
        });
        // const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // this.url1 = this._base64ToArrayBuffer(url2);

        const url = URL.createObjectURL(blob);
        // const url2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.retrievedFile = window.open(url);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "pptx") {
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
}
