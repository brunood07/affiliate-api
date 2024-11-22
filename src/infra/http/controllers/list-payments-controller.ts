import { ListPaymentsUseCase } from "@/domain/payment/application/use-cases/list-payments-use-case";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { PaymentPresenter } from "../presenters/payment-presenter";

export const listPaymentsSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  paymentType: z.string().optional(),
});

type ListPaymentsParamsType = z.infer<typeof listPaymentsSchema>;

@ApiTags("Payments")
@Controller("/payments")
export class ListPaymentsController {
  constructor(private readonly listPaymentsUseCase: ListPaymentsUseCase) { }

  @Get("/list")
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

    return {
      ...result.value,
      list: result.value.list.map(PaymentPresenter.toHTTP)
    }
  }
}