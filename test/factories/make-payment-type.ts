import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PaymentType, PaymentTypeProps } from '@/domain/payment/entities/payment-type'
import { randomInt } from 'crypto'
import { PrismaPaymentTypeMapper } from '@/infra/database/prisma/mappers/prisma-payment-type-mapper'

export function makePaymentType(
  override: Partial<PaymentTypeProps> = {},
  id?: UniqueEntityId,
) {
  const paymentType = PaymentType.create(
    {
      active: true,
      name: faker.person.fullName(),
      quantity: randomInt(900).toString(),
      ...override,
    },
    id,
  )

  return paymentType
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaUser(data: Partial<PaymentTypeProps> = {}): Promise<PaymentType> {
    const paymentType = makePaymentType(data)
    await this.prisma.paymentType.create({
      data: PrismaPaymentTypeMapper.toPrisma(paymentType),
    })

    return paymentType
  }
}