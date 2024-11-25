import { ListPaymentTypesUseCase } from "@/domain/payment/application/use-cases/list-payment-types-use-case";
import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { PaymentTypePresenter } from "../presenters/payment-type-presenter";

export const listPaymentTypesSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  active: z.boolean().optional()
});

type ListPaymentTypesParamsType = z.infer<typeof listPaymentTypesSchema>;

@ApiTags("Payment Type")
@Controller("/list/types")
export class ListPaymentTypesController {
  constructor(private readonly listPaymentTypesUseCase: ListPaymentTypesUseCase) { }

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('active') active: string
  ) {
    const params = listPaymentTypesSchema.parse({
      page: Number(page),
      limit: Number(limit),
      active: active === 'true' ? true : active === 'false' ? false : undefined
    })

    const result = await this.listPaymentTypesUseCase.execute({
      page: params.page,
      limit: params.limit,
      active: params.active
    })

    return {
      ...result.value,
      list: result.value.list.map(PaymentTypePresenter.toHTTP)
    };
  }
}