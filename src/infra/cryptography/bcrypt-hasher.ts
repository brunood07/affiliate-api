import { hash, compare } from 'bcryptjs'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer'
import { HasherGenerator } from '@/domain/users/application/cryptography/hasher-generator'

@Injectable()
export class BcryptHasher implements HashComparer, HasherGenerator {
  private HASH_SALT_LENGTH = 8

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}