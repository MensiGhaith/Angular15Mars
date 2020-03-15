import { Component, OnInit } from "@angular/core";
import { UploadFileService } from "app/services/File.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "app-drop-zone",
  templateUrl: "./drop-zone.component.html",
  styleUrls: ["./drop-zone.component.scss"]
})
export class DropZoneComponent implements OnInit {
  images: any = [];
  allfiles: any = [];
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = "";
  tag: String;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = "un fichier existe deja!";
        this.currentFile = undefined;
      }
    );

    this.selectedFiles = undefined;
  }
}
