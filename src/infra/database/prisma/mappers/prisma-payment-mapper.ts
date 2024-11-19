import { Payment as PrismaPayment, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Payment } from '@/domain/payment/entities/payment'

export class PrismaPaymentMapper {
  static toDomain(raw: PrismaPayment): Payment {

    return Payment.create(
      {
        affiliateId: raw.affiliateId,
        paymentTypeId: raw.paymentTypeId,
        registeredBy: raw.registeredBy
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(payment: Payment): Prisma.PaymentUncheckedCreateInput {
    return {
      id: payment.id.toString(),
      affiliateId: payment.affiliateId.toString(),
      paymentTypeId: payment.paymentTypeId.toString(),
      registeredBy: payment.registeredBy.toString()
    }
  }
}