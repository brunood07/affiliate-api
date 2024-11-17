import { Encrypter } from '@/domain/users/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  constructor(private readonly keyPrefix: string = 'fake-key') { }

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return `${this.keyPrefix}-${JSON.stringify(payload)}`
  }

  async verify(token: string): Promise<Record<string, unknown>> {
    return {
      sub: token,
      isRefreshToken: true
    }
  }
}