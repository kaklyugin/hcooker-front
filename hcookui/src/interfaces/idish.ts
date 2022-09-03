import {IDishStep} from "./idish-step";

export interface Idish
{
  dishId: string;
  dishName: string;
  dishWeight: number;
  dishWeightDeviaton: number;
  steps : IDishStep[];
}
