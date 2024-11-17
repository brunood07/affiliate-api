import { UseCaseError } from '@/core/errors/use-case-error'

export class AffiliateNotFound extends Error implements UseCaseError {
  constructor() {
    super("affiliate not found!");
  }
}