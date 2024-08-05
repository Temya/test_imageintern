import { Injectable } from '@angular/core';
import { LOGIN_URL, TOKEN_KEY } from './constants';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly token$: Observable<string | undefined>;

  public readonly token$$: BehaviorSubject<string | undefined>;

  constructor(
    private readonly router: Router,
    private readonly backend: BackendService
    ) {
    const token = localStorage.getItem(TOKEN_KEY) || undefined;
	  this.token$$ = new BehaviorSubject<string | undefined>(token);
	  this.token$ = this.token$$.asObservable();
  }

  public login$(login: string, password: string): Observable<unknown> {
		return this.backend.checkAuth$(login, password).pipe(
			tap((res) => {
				this.setToken(res.token);
			})
		);
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
