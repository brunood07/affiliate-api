import { PaymentsRepository } from "@/domain/payment/application/repositories/payments-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { ListPaymentsRequestDTO, ListPaymentsResponseDTO, UpdatePaymentDTO } from "@/domain/payment/application/repositories/payments-repository.types";
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
}