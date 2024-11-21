import { AffiliateRepository } from "@/domain/affiliate/application/repositories/affiliates-repository";
import { PrismaService } from "../prisma.service";
import { ListAffiliatesParams, ListAffiliatesResponseDTO, UpdateAffiliateInfoRequestDTO } from "@/domain/affiliate/application/repositories/afiiliates-repository.types";
import { Affiliate } from "@/domain/affiliate/entities/affiliate";
import { PrismaAffiliateMapper } from "../mappers/prisma-affiliate-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAffiliateRepository implements AffiliateRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: Affiliate): Promise<void> {
    await this.prisma.affiliate.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      }
    });
  }

  async findById(id: string): Promise<Affiliate | null> {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id }
    });

    if (!affiliate) return null;

    return Affiliate.create(affiliate);
  }

  async findByPhoneNumberOrEmail(phoneNumber?: string, email?: string): Promise<Affiliate | null> {
    const affiliate = await this.prisma.affiliate.findFirst({
      where: {
        OR: [
          { phoneNumber: phoneNumber },
          { email: email }
        ]
      }
    });

    if (!affiliate) return null;

    return Affiliate.create(affiliate);
  }

  async list(params: ListAffiliatesParams): Promise<ListAffiliatesResponseDTO> {
    const { page = 1, limit = 10, email, firstName, lastName, phoneNumber } = params;

    const skip = (page - 1) * limit;

    const [affiliates, total] = await Promise.all([
      this.prisma.affiliate.findMany({
        where: {
          ...(email && { email: { contains: email, mode: 'insensitive' } }),
          ...(firstName && { firstName: { contains: firstName, mode: 'insensitive' } }),
          ...(lastName && { lastName: { contains: lastName, mode: 'insensitive' } }),
          ...(phoneNumber && { phoneNumber: { contains: phoneNumber, mode: 'insensitive' } })
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.affiliate.count({
        where: {
          ...(email && { email: { contains: email, mode: 'insensitive' } }),
          ...(firstName && { firstName: { contains: firstName, mode: 'insensitive' } }),
          ...(lastName && { lastName: { contains: lastName, mode: 'insensitive' } }),
          ...(phoneNumber && { phoneNumber: { contains: phoneNumber, mode: 'insensitive' } })
        }
      })
    ]);

    return {
      list: affiliates.map(PrismaAffiliateMapper.toDomain),
      totalOfRecords: total,
      page,
      limit,
      totalOfPages: Math.ceil(total / limit)
    };
  }

  async update(id: string, data: UpdateAffiliateInfoRequestDTO): Promise<Affiliate> {
    const affiliate = await this.prisma.affiliate.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      }
    });

    return Affiliate.create(affiliate);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.affiliate.delete({
      where: { id }
    });
  }
}