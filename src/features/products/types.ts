export interface Product {
  id: number;
  title: string;
  price: number;
}
export type ProductInput = Omit<Product, 'id'>;
