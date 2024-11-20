import { Module } from '@nestjs/common'
import { CryptographyModule } from "../cryptography/cryptography.module";
import { DatabaseModule } from "../database/database.module";
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user-use-case';
import { CreateUserController } from './controllers/create-user-controller';
import { AuthenticateUserController } from './controllers/authenticate-user-controller';
import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user-use-case';
import { RefreshTokenController } from './controllers/refresh-token-controller';
import { RefreshTokenUseCase } from '@/domain/users/application/use-cases/refresh-token-use-case';
import { CreateAffiliateController } from './controllers/create-affiliate-controller';
import { CreateAffiliateUseCase } from '@/domain/affiliate/application/use-cases/create-affiliate-use-case';
import { ListAffiliatesController } from './controllers/list-affiliates-controller';
import { UpdateAffiliateController } from './controllers/update-affiliate-controller';
import { ListAffiliatesUseCase } from '@/domain/affiliate/application/use-cases/list-affiliates-use-case';
import { UpdateAffiliateUseCase } from '@/domain/affiliate/application/use-cases/update-affiliate-use-case';
import { CreatePaymentController } from './controllers/create-payment-controller';
import { DeletePaymentController } from './controllers/delete-payment-controller';
import { GetPaymentInfoController } from './controllers/get-payment-info-controller';
import { ListPaymentsController } from './controllers/list-payments-controller';
import { CreatePaymentUseCase } from '@/domain/payment/application/use-cases/create-payment-use-case';
import { DeletePaymentUseCase } from '@/domain/payment/application/use-cases/delete-payment-use-case';
import { GetPaymentInfoUseCase } from '@/domain/payment/application/use-cases/get-payment-info-use-case';
import { ListPaymentsUseCase } from '@/domain/payment/application/use-cases/list-payments-use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    RefreshTokenController,
    CreateAffiliateController,
    ListAffiliatesController,
    UpdateAffiliateController,
    CreatePaymentController,
    DeletePaymentController,
    GetPaymentInfoController,
    ListPaymentsController
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    RefreshTokenUseCase,
    CreateAffiliateUseCase,
    ListAffiliatesUseCase,
    UpdateAffiliateUseCase,
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentInfoUseCase,
    ListPaymentsUseCase
  ],
})
export class HttpModule { }