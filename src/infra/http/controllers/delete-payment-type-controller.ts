import { DeletePaymentTypeUseCase } from "@/domain/payment/application/use-cases/delete-payment-type-use-case";
import { PaymentTypeNotFoundError } from "@/domain/payment/application/use-cases/errors/payment-type-not-found-error";
import { BadRequestException, ConflictException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Payment Type")
@Controller("/types")
export class DeletePaymentTypeController {
  constructor(private readonly deletePaymentTypeUseCase: DeletePaymentTypeUseCase) { }

  @Delete("/:id")
  @HttpCode(204)
  async handle(@Param('id') paymentTypeId: string) {
    const result = await this.deletePaymentTypeUseCase.execute(paymentTypeId)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PaymentTypeNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}