import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  private baseUrl = "http://localhost:8080/gp";
  OnUpload(selectedFile: File, tag: string, dep: string): Observable<any> {
    const uploadImageData = new FormData();
    uploadImageData.append("file", selectedFile, selectedFile.name);
    uploadImageData.append("tag", tag);
    uploadImageData.append("dep", dep);

    //Make a call to the Spring Boot Application to save the image
    return this.http.post("http://localhost:8080/gp/do", uploadImageData, {
      observe: "response",
    });
  }

  constructor(private http: HttpClient) {}
  getFilesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getfiles`);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append("file", file);

    const req = new HttpRequest("POST", `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: "json",
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  getFile(tag: string) {
    return this.http.get("http://localhost:8080/gp/get/" + tag);
  }
  updateFile(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/filesUpdate/${id}`, value);
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/fileDelete/${id}`, {
      responseType: "text",
    });
  }
}
