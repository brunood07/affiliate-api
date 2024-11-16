import { Module } from '@nestjs/common'
import { CryptographyModule } from "../cryptography/cryptography.module";
import { DatabaseModule } from "../database/database.module";
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user-use-case';
import { CreateUserController } from './controllers/create-user-controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,

  ],
  providers: [
    CreateUserUseCase,
  ],
})
export class HttpModule { }