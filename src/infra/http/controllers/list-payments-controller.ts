import { ListPaymentsUseCase } from "@/domain/payment/application/use-cases/list-payments-use-case";
import { Controller, Get, Query } from "@nestjs/common";
import { z } from "zod";

export const listPaymentsSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  paymentType: z.string().optional(),
});

type ListPaymentsParamsType = z.infer<typeof listPaymentsSchema>;

@Controller("/payments/list")
export class ListPaymentsController {
  constructor(private readonly listPaymentsUseCase: ListPaymentsUseCase) { }

  @Get()
  async handle(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('paymentType') paymentType?: string) {
    const params = listPaymentsSchema.parse({
      page: Number(page),
      limit: Number(limit),
      paymentType
    })
    const result = await this.listPaymentsUseCase.execute({
      page: params.page,
      limit: params.limit,
      paymentType: params.paymentType,
    });
    return result.value
  }
}