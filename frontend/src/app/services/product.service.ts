import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  get(id :Observable<any>): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data:Observable<any>): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id:Observable<any>, data:Observable<any>): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id:Observable<any>): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}