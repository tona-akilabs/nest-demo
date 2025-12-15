import { UsersService } from './users.service';
export declare class UsersController {
    private svc;
    constructor(svc: UsersService);
    create(dto: {
        email: string;
        name: string;
    }): Promise<import("./user.entity").User>;
    list(q?: string, page?: string): Promise<{
        total: number;
        rows: import("./user.entity").User[];
    }>;
}
