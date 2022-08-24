import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {CurrentOrder} from "../interfaces/current-order";

@Injectable({
  providedIn: 'root'
})
export class CurrentOrderService {
  currentOrderUrl = 'http://localhost:8080/api/v1/order';

  constructor( private http: HttpClient) {}

  getOrder() {
    return this.http.get<CurrentOrder>(this.currentOrderUrl);
  }

}

