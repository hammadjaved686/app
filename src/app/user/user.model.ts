import { User } from './user.interface';

export class UserModel implements User {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public description: string,
    public category: { id: number; name: string; image: string },
    public images: string[]
  ) {}
}
