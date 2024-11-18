import { PaymentType } from "../../entities/payment-type";
import { ListPaymentTypesDTO, ListPaymentTypesParamsDTO, UpdatePaymentTypeDTO } from "./payment-types-repository.types";

export abstract class PaymentTypesRepository {
  abstract create(paymentType: PaymentType): Promise<void>
  abstract findById(id: string): Promise<PaymentType | null>
  abstract list(params: ListPaymentTypesParamsDTO): Promise<ListPaymentTypesDTO>
  abstract update(id: string, data: UpdatePaymentTypeDTO): Promise<PaymentType>
  abstract delete(id: string): Promise<void>
}