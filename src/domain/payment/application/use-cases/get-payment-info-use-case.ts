import { Either, left, right } from "@/core/either";
import { PaymentsRepository } from "../repositories/payments-repository";
import { PaymentNotFoundError } from "./errors/payment-not-found-error";
import { Payment } from "../../entities/payment";

type GetPaymentInfoUseCaseResponseDTO = Either<PaymentNotFoundError, {
  payment: Payment
}>;

export class GetPaymentInfoUseCase {
  constructor(private readonly paymentsRepository: PaymentsRepository) { }

  execute = async (id: string): Promise<GetPaymentInfoUseCaseResponseDTO> => {
    const paymentExists = await this.paymentsRepository.findById(id)
    if (!paymentExists) return left(new PaymentNotFoundError());
    return right({
      payment: paymentExists
    })
  }
}