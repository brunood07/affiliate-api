import { UseCaseError } from '@/core/errors/use-case-error'

export class PaymentTypeNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("payment type not found!");
  }
}