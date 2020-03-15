import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { User } from "./User";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private baseUrl = "http://localhost:8080/gp/employees";
  private baseUrl1 = "http://localhost:8080/gp/employees/accepter";
  private baseUrl2 = "http://localhost:8080/gp/DeleteRole";

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: User): Observable<Object> {
    return this.http
      .post(`${this.baseUrl}`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  AcceptUser(id: number): Observable<Object> {
    return this.http.put(`${this.baseUrl1}/${id}`, { responseType: "text" });
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
  deleteRole(id: number, role: String): Observable<any> {
    return this.http.delete(`${this.baseUrl2}/${id}/${role}`, {
      responseType: "text"
    });
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
