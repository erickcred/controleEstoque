import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { IGetProductsResponse } from 'src/app/Models/Interfaces/Products/Response/IGetProductsResponse';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api_url = Environment.API_URL;
  private jwt_token = this.cookieService.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwt_token}`
    })
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllProducts(): Observable<IGetProductsResponse[]> {
    return this.http
    .get<IGetProductsResponse[]>(`${this.api_url}/products`, this.httpOptions)
    .pipe(
      map(product => product.filter(p => p.amount > 0))
    );
  }
}
