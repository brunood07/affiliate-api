import { Module } from '@nestjs/common'
import { CryptographyModule } from "../cryptography/cryptography.module";
import { DatabaseModule } from "../database/database.module";
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user-use-case';
import { CreateUserController } from './controllers/create-user-controller';
import { AuthenticateUserController } from './controllers/authenticate-user-controller';
import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user-use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase
  ],
})
export class HttpModule { }