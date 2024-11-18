import { PaymentTypesRepository } from "@/domain/payment/application/repositories/payment-types-repository"
import { PaymentTypeNotFoundError } from "./errors/payment-type-not-found-error"
import { PaymentType } from "@/domain/payment/entities/payment-type"
import { Either, left, right } from "@/core/either"

type GetPaymentTypeInfoResponseDTO = Either<PaymentTypeNotFoundError, {
  paymentType: PaymentType
}>

export class GetPaymentTypeInfoUseCase {
  constructor(private paymentTypesRepository: PaymentTypesRepository) { }

  async execute(id: string): Promise<GetPaymentTypeInfoResponseDTO> {
    const paymentType = await this.paymentTypesRepository.findById(id)

    if (!paymentType) left(new PaymentTypeNotFoundError())

    return right({ paymentType })
  }
}
