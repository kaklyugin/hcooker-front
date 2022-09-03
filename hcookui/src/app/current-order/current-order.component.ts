import { Component, OnInit } from '@angular/core';
import {ICurrentOrder} from "../../interfaces/icurrent-order";
import {CurrentOrderService} from "../../services/current-order.service";

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})

export class CurrentOrderComponent implements OnInit {

  currentOrder: ICurrentOrder ;
  currentStepNum: string | undefined;

  constructor(private  currentOrderService: CurrentOrderService) { }

  ngOnInit(): void {
    this.getCurrentOrder();
  }
 calculateCurrentStep()
  {
    let inComplete = this.currentOrder.dish.steps.find(function(s){return s.completed==false});
    this.currentStepNum = inComplete?.sequenceNum;

  }



getCurrentOrder() {
    this.currentOrderService.getOrder()
      .subscribe({
        next: (res) => {
          this.currentOrder = res;
          this.calculateCurrentStep();
        },
        error: (err) => {alert(err)},
        complete:() =>{}
      })
  }
  updateStepWeight()
  {
    this.currentOrderService.updateStepWeight().subscribe(
      {
        next: (res) => {
          this.currentOrder = res;
          this.calculateCurrentStep();
        },
        error: (err) => {
          alert(err)
        },
        complete: () => {
        }
      })
  }
}
