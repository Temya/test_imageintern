import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ImagesData } from "../interfaces/images-data";
import { SearchInterface } from "../interfaces/search-interface";
import { UserData } from "../interfaces/userdata";
import { UserParams } from "../interfaces/userparams";
import { RegNewUser } from "../interfaces/reg-new-user";
import { ImagesService } from "./images.service";

@Injectable({
  providedIn: "root",
})
export class BackendService {

  public user?: UserData;

  constructor(
    private readonly http: HttpClient,
    private readonly imageService: ImagesService) {}

  public getAllDataImages$(paramsDb: SearchInterface): Observable<ImagesData> {
    return this.imageService.getImages$(paramsDb);
  }

  public checkAuth$(username: string, password: string): Observable<UserData> {
    const url = `https://dummyjson.com/auth/login`;
    return this.http.post<UserData>(url, { username, password });
  }

  public regNewUser$(body: RegNewUser): Observable<UserParams> {
    const url = "https://dummyjson.com/users/add";
    return this.http.post<UserParams>(url, body);
  }

  public isAuth(): boolean {
    if(this.user){
      return true;
    }
    return false;
  }
}
