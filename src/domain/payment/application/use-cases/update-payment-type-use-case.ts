import { Either, left, right } from "@/core/either"
import { PaymentTypesRepository } from "@/domain/payment/application/repositories/payment-types-repository"
import { PaymentType } from "@/domain/payment/entities/payment-type"
import { PaymentTypeNotFoundError } from "./errors/payment-type-not-found-error copy"
import { Injectable } from "@nestjs/common"

interface UpdatePaymentTypeUseCaseRequest {
  name?: string
  quantity?: string
  active?: boolean
}

type UpdatePaymentTypeResponseDTO = Either<PaymentTypeNotFoundError,
  {
    paymentType: PaymentType
  }
>

@Injectable()
export class UpdatePaymentTypeUseCase {
  constructor(private paymentTypesRepository: PaymentTypesRepository) { }

  async execute(id: string, data: UpdatePaymentTypeUseCaseRequest): Promise<UpdatePaymentTypeResponseDTO> {
    const paymentType = await this.paymentTypesRepository.findById(id)
    if (!paymentType) return left(new PaymentTypeNotFoundError())
    const updatedPaymentType = await this.paymentTypesRepository.update(id, data)
    return right({ paymentType: updatedPaymentType })
  }
}
