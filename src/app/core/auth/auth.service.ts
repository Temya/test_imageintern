import { Injectable } from "@angular/core";
import { LOGIN_URL, TOKEN_KEY } from "./constants";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { UserData } from "../../interfaces/userdata";
import { HttpClient } from "@angular/common/http";
import { UserParams } from "../../interfaces/userparams";
import { RegNewUser } from "../../interfaces/reg-new-user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public readonly token$: Observable<string | undefined>;
  public readonly token$$: BehaviorSubject<string | undefined>;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
  ) {
    const token = localStorage.getItem(TOKEN_KEY) || undefined;
    this.token$$ = new BehaviorSubject<string | undefined>(token);
    this.token$ = this.token$$.asObservable();
  }

  public login$(login: string, password: string): Observable<unknown> {
    return this.checkAuth$(login, password).pipe(
      tap((res) => {
        this.setToken(res.token);
      })
    );
  }

  public checkAuth$(username: string, password: string): Observable<UserData> {
    const url = `https://dummyjson.com/auth/login`;
    return this.http.post<UserData>(url, { username, password });
  }

  public regNewUser$(body: RegNewUser): Observable<UserParams> {
    const url = "https://dummyjson.com/users/add";
    return this.http.post<UserParams>(url, body);
  }

  public handleLogoutWithRedirect(): void {
    this.handleLogout();
    this.router.navigateByUrl(LOGIN_URL);
  }

  public handleLogout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token$$.next(undefined);
  }

  public getToken(): string | undefined {
    return this.token$$.value;
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.token$$.next(token);
  }

  public get isAuth(): boolean {
    return !!this.getToken();
  }
}
