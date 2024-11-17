import { UseCaseError } from '@/core/errors/use-case-error'

export class AffiliateAlreadyRegisteredError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Affiliate with email/phonenumber ${identifier} already exists`)
  }
}