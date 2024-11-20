import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { Public } from '@/infra/auth/public'
import { WrongCredentialsError } from '@/domain/users/application/use-cases/errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user-use-case'
import { ApiTags } from '@nestjs/swagger'

const authenticateBodySchemaBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

type AuthenticateUserBodySchemaBodyType = z.infer<
  typeof authenticateBodySchemaBodySchema
>

@ApiTags("ADMIN")
@Controller('/sessions')
@Public()
export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUserUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchemaBodySchema))
  async handle(@Body() body: AuthenticateUserBodySchemaBodyType) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({ email, password })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken, refreshToken } = result.value

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }
}