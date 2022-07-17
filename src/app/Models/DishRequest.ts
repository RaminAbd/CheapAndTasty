import { Ingredient } from './Ingredient';
export class DishRequest{
  dishId: string;
        name: string;
        categoryId: string;
        description: string;
        videoURL: string;
        price: number;
        image: string;
        ingredients: Ingredient[]=[];
}
