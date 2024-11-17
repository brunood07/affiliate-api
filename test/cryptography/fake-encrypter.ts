import { Encrypter } from '@/domain/users/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  constructor(private readonly keyPrefix: string = 'fakekey') { }

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return `${this.keyPrefix}-${JSON.stringify(payload)}`
  }

  async verify(token: string): Promise<Record<string, unknown>> {
    const [prefix, payload] = token.split('-')
    if (prefix !== this.keyPrefix) {
      throw new Error('Invalid token')
    }

    if (!JSON.parse(payload).isRefreshToken) return null;

    return {
      sub: "user-1",
      isRefreshToken: true
    }
  }
}