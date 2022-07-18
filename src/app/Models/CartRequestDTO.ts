import { CartRequestItem } from './CartRequestItem';
export class CartRequestDTO{
  id: string;
  items: CartRequestItem[]=[];
}
