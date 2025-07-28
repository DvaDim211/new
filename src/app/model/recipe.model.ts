export interface Ingredient {
  name: string,
  amount: number
}

export interface Recipe {
  id: number | string,
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[]
}
