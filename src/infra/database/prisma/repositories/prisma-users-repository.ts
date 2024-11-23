import { UsersRepository } from "@/domain/users/application/repositories/users-repositorty";
import { User } from "@/domain/users/entities/user";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
      }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}