import { Payment } from "../../entities/payment";
import { ListPaymentsRequestDTO, ListPaymentsResponseDTO, UpdatePaymentDTO } from "./payments-repository.types";

export abstract class PaymentsRepository {
  abstract create(payment: Payment): Promise<void>
  abstract findById(id: string): Promise<Payment | null>
  abstract list(params: ListPaymentsRequestDTO): Promise<ListPaymentsResponseDTO>
  abstract update(id: string, data: UpdatePaymentDTO): Promise<Payment>
  abstract delete(id: string): Promise<void>
}