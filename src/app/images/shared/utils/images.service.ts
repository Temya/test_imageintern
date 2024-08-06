import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ImagesData } from "../interfaces/images-data";
import { SearchInterface } from "../interfaces/search-interface";

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  constructor(private readonly http: HttpClient) {}

  public getImages$(paramsDb: SearchInterface): Observable<ImagesData> {
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
}
