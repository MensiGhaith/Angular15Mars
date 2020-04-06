import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "app/services/token-storage.service";
import { Router } from "@angular/router";
import { File } from "data-model/fichiers.model";
import { UploadFileService } from "app/services/File.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-datahub",
  templateUrl: "./datahub.component.html",
  styleUrls: ["./datahub.component.scss"],
})
export class DatahubComponent implements OnInit {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private uploadService: UploadFileService
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
}
