import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Affiliate, AffiliateProps } from '@/domain/affiliate/entities/affiliate'
import { PrismaAffiliateMapper } from '@/infra/database/prisma/mappers/prisma-affiliate-mapper'

export function makeAffiliate(
  override: Partial<AffiliateProps> = {},
  id?: UniqueEntityId,
) {
  const affiliate = Affiliate.create(
    {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      ...override,
    },
    id,
  )

  return affiliate
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaUser(data: Partial<AffiliateProps> = {}): Promise<Affiliate> {
    const affiliate = makeAffiliate(data)
    await this.prisma.affiliate.create({
      data: PrismaAffiliateMapper.toPrisma(affiliate),
    })

    return affiliate
  }
}