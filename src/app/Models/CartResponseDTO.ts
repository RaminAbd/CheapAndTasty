import { CartResponseItemDTO } from './CartResponseItemDTO';

export class CartRequestDTO{
  id: string;
  items: CartResponseItemDTO[]=[];
  totalPrice:number;
}
