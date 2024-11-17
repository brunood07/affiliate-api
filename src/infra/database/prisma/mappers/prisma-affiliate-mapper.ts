import { Affiliate as PrismaAffiliate, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Affiliate } from '@/domain/affiliate/entities/affiliate'

export class PrismaAffiliateMapper {
  static toDomain(raw: PrismaAffiliate): Affiliate {
    return Affiliate.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: raw.email,
        phoneNumber: raw.phoneNumber
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(user: Affiliate): Prisma.AffiliateUncheckedCreateInput {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    }
  }
}