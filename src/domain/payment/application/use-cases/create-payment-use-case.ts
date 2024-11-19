import { Either, right } from "@/core/either";
import { PaymentsRepository } from "../repositories/payments-repository";
import { Payment } from "../../entities/payment";

interface CreatePaymentRequestDTO {
  paymentTypeId: string;
  affiliateId: string;
  registeredBy: string;
}

type CreatePaymentResponseDTO = Either<null, {
  payment: Payment
}>

export class CreatePaymentUseCase {
  constructor(private readonly paymentsRepository: PaymentsRepository) { }

  execute = async (data: CreatePaymentRequestDTO): Promise<CreatePaymentResponseDTO> => {
    const payment = Payment.create(data);
    await this.paymentsRepository.create(payment);
    return right({ payment })
  }
}