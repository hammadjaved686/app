import { Category } from './category.interface';

export class CategoryModel implements Category {
  constructor(
    public id: number,
    public name: string,
    public image: string,
  ) {}
}
