import { Either, right } from '@/core/either'
import { PaymentTypesRepository } from '@/domain/payment/application/repositories/payment-types-repository'
import { PaymentType } from '@/domain/payment/entities/payment-type'

interface CreatePaymentTypeUseCaseRequest {
  name: string
  quantity: string
  active?: boolean
}

type CreatePaymentTypeUseCaseResult = Either<
  Error,
  {
    paymentType: PaymentType
  }
>

export class CreatePaymentTypeUseCase {
  constructor(private paymentTypesRepository: PaymentTypesRepository) { }

  async execute({
    name,
    quantity,
    active = true,
  }: CreatePaymentTypeUseCaseRequest): Promise<CreatePaymentTypeUseCaseResult> {
    const type = PaymentType.create({
      name,
      quantity,
      active,
    })
    await this.paymentTypesRepository.create(type)

    return right({
      paymentType: type
    })
  }
}
