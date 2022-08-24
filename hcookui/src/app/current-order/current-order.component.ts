import { Component, OnInit } from '@angular/core';
import {CurrentOrder} from "../../interfaces/current-order";
import {CurrentOrderService} from "../../services/current-order.service";

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})

export class CurrentOrderComponent implements OnInit {

  currentOrder: CurrentOrder;

  constructor(private  currentOrderService: CurrentOrderService) { }

  ngOnInit(): void {
  }

  getCurrentOrder() {
    this.currentOrderService.getOrder()
      .subscribe({
        next: (res) => {this.currentOrder = res; console.log('data', res)},
        error: (err) => {alert(err)},
        complete:() =>{}
      })
  }
}
