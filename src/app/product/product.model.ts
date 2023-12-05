import { Product } from './product.interface';

export class ProductModel implements Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public description: string,
    public category: { id: number; name: string; image: string },
    public images: string[]
  ) {}
}
