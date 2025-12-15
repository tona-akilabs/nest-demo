import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(email: string, name: string): Promise<User>;
    findPage(q?: string, page?: number, pageSize?: number): Promise<[User[], number]>;
}
