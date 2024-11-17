import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidAffiliateDataError extends Error implements UseCaseError {
  constructor() {
    super("invalid affiliate data!");
  }
}