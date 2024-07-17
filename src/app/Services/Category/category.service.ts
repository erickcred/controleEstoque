import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IGetCategoryResponse } from 'src/app/Models/Interfaces/Categories/Response/IGetCategoryResponse';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly api_url = Environment.API_URL;
  private token = this.cookieService.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllCategories(): Observable<IGetCategoryResponse[]> {
    return this.http.get<IGetCategoryResponse[]>(`${this.api_url}/categories`, this.httpOptions);
  }
}
