import { Payment } from "@/domain/payment/entities/payment";

export class PaymentPresenter {
  static toHTTP(payment: Payment) {
    return {
      id: payment.id.toString(),
      paymentTypeId: payment.paymentTypeId.toString(),
      affiliateId: payment.affiliateId.toString(),
      registeredBy: payment.registeredBy.toString(),
    }
  }
}