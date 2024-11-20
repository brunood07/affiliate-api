import { PaymentTypeNotFoundError } from "@/domain/payment/application/use-cases/errors/payment-type-not-found-error copy";
import { UpdatePaymentTypeUseCase } from "@/domain/payment/application/use-cases/update-payment-type-use-case";
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Param, Put, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const updatePaymentTypeBodySchema = z.object({
  name: z.string().optional(),
  quantity: z.string().optional(),
  active: z.boolean().optional(),
})

type UpdatePaymentTypeBodyType = z.infer<typeof updatePaymentTypeBodySchema>

@Controller('/payment-type/:id')
export class UpdatePaymentTypeController {
  constructor(private readonly updatePaymentTypeUseCase: UpdatePaymentTypeUseCase) { }

  @Put()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updatePaymentTypeBodySchema))
  async handle(
    @Param('id') paymentTypeId: string,
    @Body() body: UpdatePaymentTypeBodyType
  ) {
    const { active, name, quantity } = body

    const result = await this.updatePaymentTypeUseCase.execute(paymentTypeId, {
      active,
      name,
      quantity
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PaymentTypeNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value;
  }
}