import { CreateUserUseCase } from "@/domain/users/application/use-cases/create-user-use-case";
import { Public } from "@/infra/auth/public";
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { UserAlreadyExistsError } from "@/domain/users/application/use-cases/errors/user-already-exists-error";
import { ApiTags } from "@nestjs/swagger";

const createUserBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateUserBodyType = z.infer<typeof createUserBodySchema>

@ApiTags("ADMIN")
@Controller('/users')
@Public()
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodyType) {
    const { firstName, lastName, email, password } = body

    const result = await this.createUserUseCase.execute({ firstName, lastName, email, password })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value;
  }
}