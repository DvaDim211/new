export interface Ingredient {
  name: string,
  amount: number
}

export interface Recipe {
  name?: string;
  description?: string;
  imagePath?: string;
  ingredients?: Ingredient[]
}
