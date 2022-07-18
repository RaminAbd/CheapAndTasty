import { Ingredient } from './Ingredient';
export class Dish{
  id: string;
        categoryId: string;
        imageURL: string;
        videoURL: string;
        description: string;
        ingredients: any[]=[];
        inregientsPrice: number;
        price: number;
        name: string;
}
