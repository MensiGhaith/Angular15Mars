import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "app/services/token-storage.service";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { UploadFileService } from "app/services/File.service";
import { error } from "protractor";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  private roles: string[];
  p: number;
  retrieveResonse: any;
  base64Data: any;
  retrievedFile: any;
  isLoggedIn = false;
  showAdminBoard = false;
  showDatahubBoard = false;
  showGpBoard = false;
  username: String;
  filtered: any = [];
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private sanitizer: DomSanitizer,
    private uploadService: UploadFileService
  ) {}
  onPageChange(page: number) {
    this.p = page;
  }

  ngOnInit() {
    this.filtered = JSON.parse(
      localStorage.getItem(this.tokenStorageService.getUser().id)
    );

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ADMIN");
      this.showDatahubBoard = this.roles.includes("DATAHUB");
      this.showGpBoard = this.roles.includes("GP");

      this.username = user.username;
    }
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  GetById(id: number) {
    this.uploadService.getFile(id).subscribe((res) => {
      this.retrieveResonse = res;
      this.base64Data = this.retrieveResonse.fileContent;

      if (
        this.retrieveResonse.active != null &&
        this.retrieveResonse.active == false
      ) {
        alert("le fichier est deverouillé");
        return false;
      } else if (
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
  Download(id: number) {
    this.uploadService.getFile(id).subscribe(
      (res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.fileContent;
        if (this.retrieveResonse.active == false) {
          alert("le fichier est deverouillé");
          return false;
        } else if (
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
        } else if (this.retrieveResonse.fileType.toLocaleLowerCase() == "pdf") {
          var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
            type: "application/pdf",
          });

          const url = URL.createObjectURL(blob);

          var fileLink = document.createElement("a");
          fileLink.href = url;
          fileLink.download = this.retrieveResonse.name;
          fileLink.click();
          console.log(this.retrieveResonse);
        } else if (
          this.retrieveResonse.fileType.toLocaleLowerCase() == "docx"
        ) {
          var blob = new Blob([this.base64Data], {
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
        } else if (
          this.retrieveResonse.fileType.toLocaleLowerCase() == "pptx"
        ) {
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
      },
      (error) => {
        if (error.error.status == 500) {
          alert("fichier supprimé par l'administrateur");
          this.remove(id);
        }
      }
    );
  }

  remove(id: number) {
    let someArray4 = JSON.parse(
      localStorage.getItem(this.tokenStorageService.getUser().id)
    );
    const indx = someArray4.findIndex((v) => v.id === id);
    someArray4.splice(indx, indx >= 0 ? 1 : 0);
    localStorage.setItem(
      this.tokenStorageService.getUser().id,
      JSON.stringify(someArray4)
    );
    this.ngOnInit();
  }
}
