import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { RefreshTokenUseCase } from '@/domain/users/application/use-cases/refresh-token-use-case'
import { InvalidRefreshTokenError } from '@/domain/users/application/use-cases/errors/invalid-refresh-token-error'

let sut: RefreshTokenUseCase
let encrypter: FakeEncrypter

describe('Refresh Token Use Case', () => {
  beforeEach(() => {
    encrypter = new FakeEncrypter()
    sut = new RefreshTokenUseCase(encrypter)
  })

  it('should be able to refresh tokens', async () => {
    const refreshToken = await encrypter.encrypt({
      sub: 'user1',
      isRefreshToken: true,
    })

    const result = await sut.execute({
      refreshToken,
    })
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    }
  })

  it('should not refresh tokens with invalid refresh token', async () => {
    const result = await sut.execute({
      refreshToken: 'invalid-refresh-token',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidRefreshTokenError)
  })

  it('should not refresh tokens with access token', async () => {
    const accessToken = await encrypter.encrypt({
      sub: 'user1',
      isRefreshToken: false,
    })

    const result = await sut.execute({
      refreshToken: accessToken,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidRefreshTokenError)
  })
})
