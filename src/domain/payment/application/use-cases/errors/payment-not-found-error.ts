import { UseCaseError } from '@/core/errors/use-case-error'

export class PaymentNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("payment not found!");
  }
}