import { Either, right } from "@/core/either";
import { PaymentsRepository } from "../repositories/payments-repository";
import { Payment } from "../../entities/payment";

interface ListPaymentsRequestDTO {
  page: number;
  limit: number;
  paymentType: string;
}

type ListPaymentsResponseDTO = Either<null, {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: Payment[];
}>

export class ListPaymentsUseCase {
  constructor(private readonly paymentsRepository: PaymentsRepository) { }

  execute = async (data: ListPaymentsRequestDTO): Promise<ListPaymentsResponseDTO> => {
    const response = await this.paymentsRepository.list(data);
    return right({
      limit: response.limit,
      page: response.page,
      list: response.list,
      totalOfPages: response.totalOfRecords,
      totalOfRecords: response.totalOfPages,
    })
  }
}