import { DeletePaymentUseCase } from "@/domain/payment/application/use-cases/delete-payment-use-case";
import { PaymentNotFoundError } from "@/domain/payment/application/use-cases/errors/payment-not-found-error";
import { BadRequestException, ConflictException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Payments")
@Controller("/payments/:id")
export class DeletePaymentController {
  constructor(private readonly deletePaymentUseCase: DeletePaymentUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') paymentId: string) {
    const result = await this.deletePaymentUseCase.execute(paymentId)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PaymentNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}