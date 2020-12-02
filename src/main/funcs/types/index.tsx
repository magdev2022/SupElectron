export interface ParsedProduct {
  id: number;
  name: string;
  style: ProductStyle;
  size: ProductSize;
  price: number;
}

export interface Product {
  name: string;
  id: number;
  image_url: string;
  image_url_hi: string;
  price: number;
  sale_price: number;
  new_item: boolean;
  position: number;
  category: string;
}

export interface ProductStyle {
  id: number;
  name: string;
  currency: string;
  description: string;
  image_url: string;
  image_url_hi: string;
  sizes: Array<ProductSize>;
}

export interface ProductSize {
  name: string;
  id: number;
  stock_level: number;
}

export type Region = "usa" | "eu" | "jp";
