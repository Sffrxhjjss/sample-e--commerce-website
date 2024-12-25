export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'clothing' | 'shoes';
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}