import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AffiliateProps {
  firstName: string
  lastName: string
  email?: string
  phoneNumber: string
}

export class Affiliate extends Entity<AffiliateProps> {
  get firstName() {
    return this.props.firstName
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName
  }

  get lastName() {
    return this.props.lastName
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName
  }

  get email() {
    return this.props.email
  }

  set email(email: string | undefined) {
    this.props.email = email
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber
  }
  static create(props: AffiliateProps, id?: UniqueEntityId) {
    const affiliate = new Affiliate(
      {
        ...props,
      },
      id,
    )

    return affiliate
  }
}