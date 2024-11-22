import { PaymentType } from "@/domain/payment/entities/payment-type";


export class PaymentTypePresenter {
  static toHTTP(paymentType: PaymentType) {
    return {
      id: paymentType.id.toString(),
      name: paymentType.name,
      quantity: paymentType.quantity,
      active: paymentType.active,
    }
  }
}