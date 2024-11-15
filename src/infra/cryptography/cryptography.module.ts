import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { Encrypter } from '@/domain/users/application/cryptography/encrypter'
import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer'
import { HasherGenerator } from '@/domain/users/application/cryptography/hasher-generator'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HasherGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HasherGenerator],
})
export class CryptographyModule { }