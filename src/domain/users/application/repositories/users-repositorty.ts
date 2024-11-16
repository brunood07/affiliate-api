import { User } from "../../entities/user";

export abstract class UsersRepository {
  abstract create(data: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}