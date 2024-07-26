import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesData } from '../interfaces/images-data';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private key = '45072497-2e163a8c2444004f35e828516';
  public searchWord: string = '';
  public categoryWord: string = 'all';
  public sortWord: string = 'popular';

  constructor(private readonly http: HttpClient) {}

  public getAllDataImages$(page: number): Observable<ImagesData> {
    const url = `https://pixabay.com/api/?&image_type=photo&`;
    return this.http.get<ImagesData>(url, {
      params: {
        key: this.key,
        q: this.searchWord,
        category: this.categoryWord,
        order: this.sortWord,
        page: page,
        per_page: 8,
      },
    });
  }
}
