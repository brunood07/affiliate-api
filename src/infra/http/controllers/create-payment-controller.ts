import { CreatePaymentUseCase } from "@/domain/payment/application/use-cases/create-payment-use-case";
import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ApiTags } from "@nestjs/swagger";
import { PaymentPresenter } from "../presenters/payment-presenter";

const createPaymentBodySchema = z.object({
  affiliateId: z.string(),
  paymentTypeId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createPaymentBodySchema)

type createPaymentBodyType = z.infer<typeof createPaymentBodySchema>

@ApiTags("Payments")
@Controller("/payments")
export class CreatePaymentController {
  constructor(private readonly createPaymentUseCase: CreatePaymentUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: createPaymentBodyType,
    @CurrentUser() user: UserPayload,
  ) {
    const { paymentTypeId, affiliateId } = body;
    const registeredBy = user.sub
    const result = await this.createPaymentUseCase.execute({
      paymentTypeId,
      affiliateId,
      registeredBy
    })

    return PaymentPresenter.toHTTP(result.value.payment);
  }
}