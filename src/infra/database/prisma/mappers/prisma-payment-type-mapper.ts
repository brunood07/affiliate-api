import { PaymentType as PrismaPaymentType, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PaymentType } from '@/domain/payment/entities/payment-type'

export class PrismaPaymentTypeMapper {
  static toDomain(raw: PrismaPaymentType): PaymentType {

    return PaymentType.create(
      {
        active: raw.active,
        name: raw.name,
        quantity: raw.quantity,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(paymentType: PaymentType): Prisma.PaymentTypeUncheckedCreateInput {
    return {
      id: paymentType.id.toString(),
      name: paymentType.name,
      quantity: paymentType.quantity,
      active: paymentType.active,
    }
  }
}