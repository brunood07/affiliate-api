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
import { CreatePaymentTypeController } from './controllers/create-payment-type-controller';
import { DeletePaymentTypeController } from './controllers/delete-payment-type-controller';
import { GetPaymentTypeInfoController } from './controllers/get-payment-type-info-controller';
import { ListPaymentTypesController } from './controllers/list-payment-types-controller';
import { UpdatePaymentTypeController } from './controllers/update-payment-type-controller';
import { CreatePaymentTypeUseCase } from '@/domain/payment/application/use-cases/create-payment-type-use-case';
import { GetPaymentTypeInfoUseCase } from '@/domain/payment/application/use-cases/get-payment-type-info-use-case';
import { DeletePaymentTypeUseCase } from '@/domain/payment/application/use-cases/delete-payment-type-use-case';
import { ListPaymentTypesUseCase } from '@/domain/payment/application/use-cases/list-payment-types-use-case';
import { UpdatePaymentTypeUseCase } from '@/domain/payment/application/use-cases/update-payment-type-use-case';
import { DeleteAffiliateController } from './controllers/delete-affiliate-controller';
import { DeleteAffiliateUseCase } from '@/domain/affiliate/application/use-cases/delete-affiliate-use-case';
import { GetAffiliatePaymentsController } from './controllers/get-affiliate-payments-controller';
import { GetAffiliatePaymentsUseCase } from '@/domain/payment/application/use-cases/get-affiliate-payments-use-case';
import { GetAffiliateInfoController } from './controllers/get-affiliate-info-controller';
import { GetAffiliateInfoUseCase } from '@/domain/affiliate/application/use-cases/get-affiliate-info-use-case';
import { GetAffiliatesAndPaymentInfoPerMonthUseCase } from '@/domain/payment/application/use-cases/get-affiliates-and-payments-info-per-month-use-case';
import { GetAffiliatesAndPaymentInfoPerMonthController } from './controllers/get-affiliates-and-payments-info-per-month-controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    RefreshTokenController,
    CreateAffiliateController,
    DeleteAffiliateController,
    GetAffiliatePaymentsController,
    GetAffiliateInfoController,
    ListAffiliatesController,
    UpdateAffiliateController,
    CreatePaymentController,
    DeletePaymentController,
    GetPaymentInfoController,
    ListPaymentsController,
    CreatePaymentTypeController,
    DeletePaymentTypeController,
    GetPaymentTypeInfoController,
    ListPaymentTypesController,
    UpdatePaymentTypeController,
    GetAffiliatesAndPaymentInfoPerMonthController
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    RefreshTokenUseCase,
    CreateAffiliateUseCase,
    DeleteAffiliateUseCase,
    GetAffiliatePaymentsUseCase,
    GetAffiliateInfoUseCase,
    ListAffiliatesUseCase,
    UpdateAffiliateUseCase,
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentInfoUseCase,
    ListPaymentsUseCase,
    CreatePaymentTypeUseCase,
    DeletePaymentTypeUseCase,
    GetPaymentTypeInfoUseCase,
    ListPaymentTypesUseCase,
    UpdatePaymentTypeUseCase,
    GetAffiliatesAndPaymentInfoPerMonthUseCase
  ],
})
export class HttpModule { }