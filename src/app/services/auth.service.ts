import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { User } from "./User";

const AUTH_API = "http://localhost:8080/auth/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  RegisterUrl = "http://localhost:8080/auth/signup";

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + "signin",
      {
        username: credentials.username,
        password: credentials.password
      },
      httpOptions
    );
  }

  register(user: User): Observable<Object> {
    return this.http
      .post(`${this.RegisterUrl}`, user)
      .pipe(retry(1), catchError(this.handleError));
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
