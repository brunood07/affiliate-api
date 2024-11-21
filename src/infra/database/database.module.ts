import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { UsersRepository } from '@/domain/users/application/repositories/users-repositorty'
import { AffiliateRepository } from '@/domain/affiliate/application/repositories/affiliates-repository';
import { PrismaAffiliateRepository } from './prisma/repositories/prisma-affiliate-repository';
import { PaymentsRepository } from '@/domain/payment/application/repositories/payments-repository';
import { PrismaPaymentsRepository } from './prisma/repositories/prisma-payments-repository';
import { PaymentTypesRepository } from '@/domain/payment/application/repositories/payment-types-repository';
import { PrismaPaymentTypesRepository } from './prisma/repositories/prisma-payment-types-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: AffiliateRepository,
      useClass: PrismaAffiliateRepository
    },
    {
      provide: PaymentsRepository,
      useClass: PrismaPaymentsRepository
    },
    {
      provide: PaymentTypesRepository,
      useClass: PrismaPaymentTypesRepository
    }
  ],
  exports: [
    PrismaService,
    UsersRepository,
    AffiliateRepository,
    PaymentsRepository,
    PaymentTypesRepository
  ],
})
export class DatabaseModule { }