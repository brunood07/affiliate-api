import { Either, right } from "@/core/either"
import { PaymentTypesRepository } from "@/domain/payment/application/repositories/payment-types-repository"
import { PaymentType } from "@/domain/payment/entities/payment-type"
import { Injectable } from "@nestjs/common"

interface ListPaymentTypesUseCaseRequestDTO {
  page: number
  limit: number
}

type ListPaymentTypesResponseDTO = Either<null, {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: PaymentType[];
}>

@Injectable()
export class ListPaymentTypesUseCase {
  constructor(private paymentTypesRepository: PaymentTypesRepository) { }

  async execute(params: ListPaymentTypesUseCaseRequestDTO): Promise<ListPaymentTypesResponseDTO> {
    const paymentTypes = await this.paymentTypesRepository.list(params)

    return right({
      limit: paymentTypes.limit,
      page: paymentTypes.page,
      list: paymentTypes.list,
      totalOfPages: paymentTypes.totalOfPages,
      totalOfRecords: paymentTypes.totalOfRecords
    })
  }
}
