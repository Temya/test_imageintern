import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ImagesData } from "../interfaces/images-data";
import { SearchInterface } from "../interfaces/search-interface";
import { UserData } from "../interfaces/userdata";
import { UserParams } from "../interfaces/userparams";
import { RegNewUser } from "../interfaces/reg-new-user";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  constructor(private readonly http: HttpClient) {}

  public getAllDataImages$(paramsDb: SearchInterface): Observable<ImagesData> {
    const url = `https://pixabay.com/api/?&image_type=photo&`;
    let paramsNew = {
      key: "45072497-2e163a8c2444004f35e828516",
      category: paramsDb.category,
      order: paramsDb.order,
      page: paramsDb.page,
      per_page: paramsDb.per_page,
    };
    if (paramsDb.q) {
      paramsNew = Object.assign(paramsNew, { q: paramsDb.q });
    }
    return this.http.get<ImagesData>(url, { params: paramsNew });
  }

  public checkAuth$(username: string, password: string): Observable<UserData> {
    const url = `https://dummyjson.com/auth/login`;
    return this.http.post<UserData>(url, { username, password });
  }

  public regNewUser$(body: RegNewUser): Observable<UserParams> {
    const url = "https://dummyjson.com/users/add";
    return this.http.post<UserParams>(url, body);
  }
}
