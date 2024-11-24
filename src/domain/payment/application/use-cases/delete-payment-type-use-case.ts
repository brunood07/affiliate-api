import { Either, left, right } from "@/core/either"
import { PaymentTypesRepository } from "@/domain/payment/application/repositories/payment-types-repository"
import { PaymentTypeNotFoundError } from "./errors/payment-type-not-found-error"
import { Injectable } from "@nestjs/common"

type DeletePaymentTypeResponseDTO = Either<PaymentTypeNotFoundError, void>

@Injectable()
export class DeletePaymentTypeUseCase {
  constructor(private paymentTypesRepository: PaymentTypesRepository) { }

  async execute(id: string): Promise<DeletePaymentTypeResponseDTO> {
    const paymentType = await this.paymentTypesRepository.findById(id)

    if (!paymentType) return left(new PaymentTypeNotFoundError())

    await this.paymentTypesRepository.delete(id)

    return right(undefined);
  }
}
