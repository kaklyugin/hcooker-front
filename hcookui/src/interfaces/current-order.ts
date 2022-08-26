import { OrderStep } from './order-step';

export interface CurrentOrder {
  name: string
  orderNo:string
  steps: OrderStep[]
}
