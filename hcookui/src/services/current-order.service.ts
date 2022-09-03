import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ICurrentOrder} from "../interfaces/icurrent-order";

@Injectable({
  providedIn: 'root'
})
export class CurrentOrderService {
  currentOrderUrl = '/api/v1/order';
  updateStepWeightUrl = '/api/v1/order/step';

  constructor( private http: HttpClient) {}

  getOrder() {
    return this.http.get<ICurrentOrder>(this.currentOrderUrl);
  }

  updateStepWeight() {
    return this.http.put<ICurrentOrder>(this.updateStepWeightUrl,{});
  }


}

