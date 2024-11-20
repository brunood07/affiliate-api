import { CreatePaymentUseCase } from "@/domain/payment/application/use-cases/create-payment-use-case";
import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const createPaymentBodySchema = z.object({
  paymentTypeId: z.string(),
  affiliateId: z.string(),
})

type createPaymentBodyType = z.infer<typeof createPaymentBodySchema>

@Controller("/payments")
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPaymentBodySchema))
  async handle(@CurrentUser() user: UserPayload, @Body() body: createPaymentBodyType) {
    const { paymentTypeId, affiliateId } = body;
    const registeredBy = user.sub
    const result = await this.createPaymentUseCase.execute({
      paymentTypeId,
      affiliateId,
      registeredBy
    })

    return result.value;
  }
}