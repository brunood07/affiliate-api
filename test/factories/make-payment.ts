import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { randomUUID } from 'crypto'
import { Payment, PaymentProps } from '@/domain/payment/entities/payment'
import { PrismaPaymentMapper } from '@/infra/database/prisma/mappers/prisma-payment-mapper'

export function makePayment(
  override: Partial<PaymentProps> = {},
  id?: UniqueEntityId,
) {
  const payment = Payment.create(
    {
      affiliateId: randomUUID(),
      paymentTypeId: randomUUID(),
      registeredBy: randomUUID(),
      ...override,
    },
    id,
  )

  return payment
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaUser(data: Partial<PaymentProps> = {}): Promise<Payment> {
    const payment = makePayment(data)
    await this.prisma.payment.create({
      data: PrismaPaymentMapper.toPrisma(payment),
    })

    return payment
  }
}