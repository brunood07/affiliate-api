import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PaymentProps {
  paymentTypeId: string
  affiliateId: string
  registeredBy: string
}

export class Payment extends Entity<PaymentProps> {
  get paymentTypeId() {
    return this.props.paymentTypeId
  }

  get affiliateId() {
    return this.props.affiliateId
  }

  get registeredBy() {
    return this.props.registeredBy
  }

  static create(props: PaymentProps, id?: UniqueEntityId) {
    const payment = new Payment(
      {
        ...props,
      },
      id,
    )

    return payment
  }
}