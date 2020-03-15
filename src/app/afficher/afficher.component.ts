import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { File } from "data-model/fichiers.model";

@Component({
  selector: "app-afficher",
  templateUrl: "./afficher.component.html",
  styleUrls: ["./afficher.component.scss"]
})
export class AfficherComponent implements OnInit {
  tag: String;
  files: File[] = [
    {
      fileName: "file1",
      fileTag: "tag1",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    },
    {
      fileName: "file2",
      fileTag: "ad",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "2éme fichier"
    },
    {
      fileName: "file1",
      fileTag: "tag3",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    },

    {
      fileName: "file1",
      fileTag: "Angular",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    },
    {
      fileName: "file1",
      fileTag: "spring",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    },

    {
      fileName: "file1",
      fileTag: "NodeJS",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    },
    {
      fileName: "file1",
      fileTag: "python",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    },

    {
      fileName: "file1",
      fileTag: "java",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    },
    {
      fileName: "file1",
      fileTag: "resource",
      fileSize: 1000,
      fileType: "img",
      fileDescription: "premiere fichier"
    }
  ];

  Search() {
    if (this.tag != "") {
      this.files = this.files.filter(res => {
        return res.fileTag
          .toLocaleLowerCase()
          .match(this.tag.toLocaleLowerCase());
      });
    } else if (this.tag === "") {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.files = [
      {
        fileName: "file1",
        fileTag: "tag1",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      },
      {
        fileName: "file2",
        fileTag: "ad",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "2éme fichier"
      },
      {
        fileName: "file1",
        fileTag: "tag3",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      },

      {
        fileName: "file1",
        fileTag: "Angular",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      },
      {
        fileName: "file1",
        fileTag: "spring",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      },

      {
        fileName: "file1",
        fileTag: "NodeJS",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      },
      {
        fileName: "file1",
        fileTag: "python",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      },

      {
        fileName: "file1",
        fileTag: "java",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      },
      {
        fileName: "file1",
        fileTag: "resource",
        fileSize: 1000,
        fileType: "img",
        fileDescription: "premiere fichier"
      }
    ];
  }
}
