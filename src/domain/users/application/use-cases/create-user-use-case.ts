import { Either, left, right } from "@/core/either";
import { User } from "../../entities/user";
import { UsersRepository } from "../repositories/users-repositorty";
import { HasherGenerator } from "../cryptography/hasher-generator";
import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type CreateUserResponseDTO = Either<UserAlreadyExistsError, {
  user: User
}>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HasherGenerator,
  ) { }

  execute = async (data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> => {
    const { firstName, lastName, email, password } = data;

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) return left(new UserAlreadyExistsError(email));

    const hashedPassword = await this.hashGenerator.hash(password);
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await this.usersRepository.create(user);
    return right({
      user
    })
  }
}