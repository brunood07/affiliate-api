import { PaymentsRepository } from "@/domain/payment/application/repositories/payments-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { FindByAffiliatedIdResponse, ListPaymentsRequestDTO, ListPaymentsResponseDTO, UpdatePaymentDTO } from "@/domain/payment/application/repositories/payments-repository.types";
import { Payment } from "@/domain/payment/entities/payment";
import { PrismaPaymentMapper } from "../mappers/prisma-payment-mapper";

@Injectable()
export class PrismaPaymentsRepository implements PaymentsRepository {
  constructor(private prismaService: PrismaService) { }

  async create(payment: Payment): Promise<void> {
    await this.prismaService.payment.create({
      data: {
        affiliateId: payment.affiliateId,
        paymentTypeId: payment.paymentTypeId,
        registeredBy: payment.registeredBy
      }
    });
  }

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prismaService.payment.findUnique({
      where: { id }
    });

    if (!payment) {
      return null;
    }

    return PrismaPaymentMapper.toDomain(payment);
  }

  async list(params: ListPaymentsRequestDTO): Promise<ListPaymentsResponseDTO> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prismaService.payment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prismaService.payment.count()
    ]);

    return {
      list: payments.map(PrismaPaymentMapper.toDomain),
      limit,
      page,
      totalOfPages: Math.ceil(total / limit),
      totalOfRecords: total
    };
  }

  async update(id: string, data: UpdatePaymentDTO): Promise<Payment> {
    const payment = await this.prismaService.payment.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });

    return PrismaPaymentMapper.toDomain(payment);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.payment.delete({
      where: { id }
    });
  }

  async findByAffiliateId(affiliateId: string, page: number, limit: number): Promise<FindByAffiliatedIdResponse> {
    const [payments, total] = await this.prismaService.$transaction([
      this.prismaService.payment.findMany({
        where: {
          affiliateId
        },
        select: {
          id: true,
          createdAt: true,
          user: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          type: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prismaService.payment.count({
        where: {
          affiliateId
        }
      })
    ])


    return {
      list: payments.map(payment => {
        return {
          registeredByName: payment.user.firstName + ' ' + payment.user.lastName,
          createdAt: payment.createdAt,
          paymentId: payment.id,
          paymentTypeName: payment.type.name
        }
      }),
      limit,
      page,
      totalOfPages: Math.ceil(total / limit),
      totalOfRecords: total
    };
  }
}