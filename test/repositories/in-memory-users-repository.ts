import { UsersRepository } from "@/domain/users/application/repositories/users-repositorty";
import { User } from "@/domain/users/entities/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User): Promise<void> {
    this.items.push(data)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)
    if (!user) return null
    return user
  }
}