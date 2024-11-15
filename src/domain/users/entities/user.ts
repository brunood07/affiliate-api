import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface UserProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class User extends Entity<UserProps> {
  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
      },
      id,
    )

    return user
  }
}