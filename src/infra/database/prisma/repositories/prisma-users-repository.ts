import { UsersRepository } from "@/domain/users/application/repositories/users-repositorty";
import { User } from "@/domain/users/entities/user";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) { }

  create(data: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}