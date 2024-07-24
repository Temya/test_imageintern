import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesData } from '../interfaces/images-data';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  public key = '45072497-2e163a8c2444004f35e828516';
  public searchWord: string = '';
  public categoryWord: string = '';
  public sortWord: string = 'popular';

  constructor(private readonly http: HttpClient) {}

  public getAllDataImages$(page: number): Observable<ImagesData> {
    const url = `https://pixabay.com/api/?key=${this.key}&q=${this.searchWord}&category=${this.categoryWord}&order=${this.sortWord}&page=${page}&image_type=photo&per_page=8`;
    return this.http.get<ImagesData>(url);
  }
}
