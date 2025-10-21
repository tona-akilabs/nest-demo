import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, name: string) {
    return this.repo.save(this.repo.create({ email, name }));
  }

  findPage(q = '', page = 1, pageSize = 20) {
    return this.repo.findAndCount({
      where: q ? [{ email: ILike(`%${q}%`) }, { name: ILike(`%${q}%`) }] : {},
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }
}
