import { Payment } from "../../entities/payment";
import { ListPaymentsDTO, UpdatePaymentDTO } from "./payments-repository.types";

export abstract class PaymentsRepository {
  abstract create(payment: Payment): Promise<void>
  abstract findById(id: string): Promise<Payment | null>
  abstract list(params: ListPaymentsDTO): Promise<Payment[]>
  abstract update(id: string, data: UpdatePaymentDTO): Promise<Payment>
  abstract delete(payment: Payment): Promise<void>
}