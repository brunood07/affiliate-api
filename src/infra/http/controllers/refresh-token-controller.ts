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
import { RefreshTokenUseCase } from '@/domain/users/application/use-cases/refresh-token-use-case'
import { InvalidRefreshTokenError } from '@/domain/users/application/use-cases/errors/invalid-refresh-token-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const refreshTokenBodySchema = z.object({
  refreshToken: z.string(),
})

type RefreshTokenBodySchemaType = z.infer<typeof refreshTokenBodySchema>

@Controller('/sessions/refresh')
@Public()
export class RefreshTokenController {
  constructor(private refreshToken: RefreshTokenUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(refreshTokenBodySchema))
  async handle(@Body() body: RefreshTokenBodySchemaType) {
    const { refreshToken } = body

    const result = await this.refreshToken.execute({ refreshToken })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidRefreshTokenError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.value

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    }
  }
}
