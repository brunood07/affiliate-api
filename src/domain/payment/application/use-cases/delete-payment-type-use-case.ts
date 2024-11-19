import { Either, left } from "@/core/either"
import { PaymentTypesRepository } from "@/domain/payment/application/repositories/payment-types-repository"
import { PaymentTypeNotFoundError } from "./errors/payment-type-not-found-error"

type DeletePaymentTypeResponseDTO = Either<PaymentTypeNotFoundError, void>

export class DeletePaymentTypeUseCase {
  constructor(private paymentTypesRepository: PaymentTypesRepository) { }

  async execute(id: string): Promise<DeletePaymentTypeResponseDTO> {
    const paymentType = await this.paymentTypesRepository.findById(id)

    if (!paymentType) return left(new PaymentTypeNotFoundError())

    await this.paymentTypesRepository.delete(id)
  }
}
