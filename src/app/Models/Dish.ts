import { Ingredient } from './Ingredient';
export class Dish{
  id: string;
        categoryId: string;
        imageURL: string;
        videoURL: string;
        description: string;
        ingredients?: Ingredient[]=[];
        inregientsPrice: number;
        price: number;
        name: string;
}
