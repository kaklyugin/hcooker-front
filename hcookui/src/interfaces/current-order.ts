import { OrderStep } from './order-step';

export interface CurrentOrder {
  name: string
  orderNum:string
  steps: OrderStep[]
}
