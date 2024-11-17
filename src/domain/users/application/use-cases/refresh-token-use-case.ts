import { Either, left, right } from '@/core/either'
import { InvalidRefreshTokenError } from './errors/invalid-refresh-token-error'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '../cryptography/encrypter'

interface RefreshTokenUseCaseRequest {
  refreshToken: string
}

type RefreshTokenUseCaseResponse = Either<
  InvalidRefreshTokenError,
  {
    accessToken: string
    refreshToken: string
  }
>

@Injectable()
export class RefreshTokenUseCase {
  constructor(private encrypter: Encrypter) { }

  async execute({
    refreshToken,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    try {
      const payload = await this.encrypter.verify(refreshToken)
      if (!payload.isRefreshToken) {
        return left(new InvalidRefreshTokenError())
      }

      const accessToken = await this.encrypter.encrypt({
        sub: payload.sub,
      })

      const newRefreshToken = await this.encrypter.encrypt({
        sub: payload.sub,
        isRefreshToken: true,
      })

      return right({
        accessToken,
        refreshToken: newRefreshToken,
      })
    } catch {
      return left(new InvalidRefreshTokenError())
    }
  }
}