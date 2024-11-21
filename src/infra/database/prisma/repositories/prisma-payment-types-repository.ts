import { PaymentTypesRepository } from "@/domain/payment/application/repositories/payment-types-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { ListPaymentTypesParamsDTO, ListPaymentTypesDTO, UpdatePaymentTypeDTO } from "@/domain/payment/application/repositories/payment-types-repository.types";
import { PaymentType } from "@/domain/payment/entities/payment-type";
import { PrismaPaymentTypeMapper } from "../mappers/prisma-payment-type-mapper";

@Injectable()
export class PrismaPaymentTypesRepository implements PaymentTypesRepository {
  constructor(private prismaService: PrismaService) { }

  async create(paymentType: PaymentType): Promise<void> {
    await this.prismaService.paymentType.create({
      data: {
        name: paymentType.name,
        quantity: paymentType.quantity,
        active: paymentType.active
      }
    });
  }

  async findById(id: string): Promise<PaymentType | null> {
    const paymentType = await this.prismaService.paymentType.findUnique({
      where: { id }
    });

    if (!paymentType) return null;

    return PrismaPaymentTypeMapper.toDomain(paymentType);
  }

  async list(params: ListPaymentTypesParamsDTO): Promise<ListPaymentTypesDTO> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [paymentTypes, total] = await Promise.all([
      this.prismaService.paymentType.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prismaService.paymentType.count()
    ]);

    return {
      list: paymentTypes.map(PrismaPaymentTypeMapper.toDomain),
      totalOfRecords: total,
      page,
      limit,
      totalOfPages: Math.ceil(total / limit)
    };
  }

  async update(id: string, data: UpdatePaymentTypeDTO): Promise<PaymentType> {
    const updatedPaymentType = await this.prismaService.paymentType.update({
      where: { id },
      data: {
        name: data.name,
        quantity: data.quantity,
        active: data.active
      }
    });

    return PrismaPaymentTypeMapper.toDomain(updatedPaymentType);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.paymentType.delete({
      where: { id }
    });
  }
}