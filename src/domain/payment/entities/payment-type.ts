import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PaymentTypeProps {
  name: string
  active: boolean
  quantity: string
}

export class PaymentType extends Entity<PaymentTypeProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get active() {
    return this.props.active
  }

  set active(active: boolean) {
    this.props.active = active
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: string) {
    this.props.quantity = quantity
  }
  static create(props: PaymentTypeProps, id?: UniqueEntityId) {
    const payment = new PaymentType(
      {
        ...props,
      },
      id,
    )

    return payment
  }
}