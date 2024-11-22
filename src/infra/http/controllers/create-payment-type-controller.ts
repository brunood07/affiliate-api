import { CreatePaymentTypeUseCase } from "@/domain/payment/application/use-cases/create-payment-type-use-case";
import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { ApiTags } from "@nestjs/swagger";
import { PaymentTypePresenter } from "../presenters/payment-type-presenter";

const createPaymentTypeBodySchema = z.object({
  name: z.string(),
  quantity: z.string(),
  active: z.boolean().optional().default(true)
})

type createPaymentTypeBodyType = z.infer<typeof createPaymentTypeBodySchema>

@ApiTags("Payment Type")
@Controller("/types")
export class CreatePaymentTypeController {
  constructor(private readonly createPaymentTypeUseCase: CreatePaymentTypeUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPaymentTypeBodySchema))
  async handle(@Body() body: createPaymentTypeBodyType) {
    const { name, quantity, active } = body;
    const result = await this.createPaymentTypeUseCase.execute({
      name,
      quantity,
      active
    })

    return PaymentTypePresenter.toHTTP(result.value.paymentType);
  }
}