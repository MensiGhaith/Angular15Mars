import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "app/services/token-storage.service";
import { Router } from "@angular/router";
import { UploadFileService } from "app/services/File.service";
import { map } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
var myfile = [];

@Component({
  selector: "app-comet",
  templateUrl: "./comet.component.html",
  styleUrls: ["./comet.component.scss"],
})
export class CometComponent implements OnInit {
  retrieveResonse: any;
  base64Data: any;
  retrievedFile: any;
  result: string;
  userid: any;
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private uploadService: UploadFileService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}
  Download(id: number) {
    this.uploadService.getFile(id).subscribe((res) => {
      this.retrieveResonse = res;
      this.base64Data = this.retrieveResonse.fileContent;

      if (
        this.retrieveResonse.fileType.toLocaleLowerCase() == "jpg" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "jpeg"
      ) {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "image/jpg",
        });
        const url = URL.createObjectURL(blob);

        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "pdf") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);

        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
        console.log(this.retrieveResonse.name);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "png") {
        var blob = new Blob([this.base64Data], {
          type: "image/png",
        });

        const url = URL.createObjectURL(blob);

        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
        console.log(this.retrieveResonse.name);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "docx") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        const url = URL.createObjectURL(blob);

        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
        console.log(this.retrieveResonse.name);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "avi") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/x-msvideo",
        });

        const url = URL.createObjectURL(blob);

        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
        console.log(this.retrieveResonse.name);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "mp4") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/mp4",
        });

        const url = URL.createObjectURL(blob);

        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
        console.log(this.retrieveResonse.name);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "ogg") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/ogg",
        });

        const url = URL.createObjectURL(blob);

        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
        console.log(this.retrieveResonse.name);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "pptx") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type:
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        });

        const url = URL.createObjectURL(blob);
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
      } else if (
        this.retrieveResonse.fileType.toLocaleLowerCase() == "xls" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "xlt" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "xla" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "xlsx"
      ) {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = URL.createObjectURL(blob);
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
      } else if (
        this.retrieveResonse.fileType.toLocaleLowerCase() == "xls" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "xlt" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "xla"
      ) {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "application/vnd.ms-excel",
        });

        const url = URL.createObjectURL(blob);
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "txt") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "text/plain",
        });

        const url = URL.createObjectURL(blob);
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
      } else {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "application/octet-stream",
        });

        const url = URL.createObjectURL(blob);
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = this.retrieveResonse.name;
        fileLink.click();
        console.log(this.retrieveResonse.name);
      }
    });
  }
  GetById(id: number) {
    this.uploadService.getFile(id).subscribe((res) => {
      this.retrieveResonse = res;
      this.base64Data = this.retrieveResonse.fileContent;
      if (
        this.retrieveResonse.fileType.toLocaleLowerCase() == "jpg" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "png" ||
        this.retrieveResonse.fileType.toLocaleLowerCase() == "jpeg"
      ) {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "image/jpg",
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

        this.retrievedFile = window.open(url, this.retrieveResonse.name);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "docx") {
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
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "avi") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/x-msvideo",
        });

        const url = URL.createObjectURL(blob);

        this.retrievedFile = window.open(url);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "mp4") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/mp4",
        });

        const url = URL.createObjectURL(blob);

        this.retrievedFile = window.open(url);
      } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "ogg") {
        var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type: "video/ogg",
        });

        const url = URL.createObjectURL(blob);

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

  SearchTag: String;
  files = [];
  filtered: {}[];
  p: number;

  ngOnInit() {
    myfile = JSON.parse(
      localStorage.getItem(this.tokenStorageService.getUser().id)
    );
    const user = this.tokenStorageService.getUser();

    this.userid = user.id;
    this.reloadData();
  }
  reloadData() {
    this.uploadService
      .getFilesList()
      .pipe(
        map(
          (arr) =>
            arr &&
            arr.filter((r) => r.departement == "COMET" && r.active == true)
        )
      )
      .subscribe((result) => {
        this.files = result;
        if (this.files) {
          this.filtered = this.files.slice();
        }
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
  Remember(id: number) {
    this.uploadService.getFileById(id).subscribe((data) => {
      if (myfile == null) {
        myfile = [];
      }
      myfile.push(data);
      localStorage.setItem(this.userid, JSON.stringify(myfile));
    });
  }
}
