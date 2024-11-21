import { Either, left } from "@/core/either";
import { PaymentsRepository } from "../repositories/payments-repository";
import { PaymentNotFoundError } from "./errors/payment-not-found-error";
import { Injectable } from "@nestjs/common";

type DeletePaymentUseCaseResponseDTO = Either<PaymentNotFoundError, void>;

@Injectable()
export class DeletePaymentUseCase {
  constructor(private readonly paymentsRepository: PaymentsRepository) { }

  execute = async (id: string): Promise<DeletePaymentUseCaseResponseDTO> => {
    const paymentExists = await this.paymentsRepository.findById(id)
    if (!paymentExists) return left(new PaymentNotFoundError());
    await this.paymentsRepository.delete(id)
  }
}