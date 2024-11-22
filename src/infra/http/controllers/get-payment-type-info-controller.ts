import { PaymentTypeNotFoundError } from "@/domain/payment/application/use-cases/errors/payment-type-not-found-error copy";
import { GetPaymentTypeInfoUseCase } from "@/domain/payment/application/use-cases/get-payment-type-info-use-case";
import { BadRequestException, ConflictException, Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaymentTypePresenter } from "../presenters/payment-type-presenter";

@ApiTags("Payment Type")
@Controller("/types")
export class GetPaymentTypeInfoController {
  constructor(private readonly getPaymentTypeInfoUseCase: GetPaymentTypeInfoUseCase) { }

  @Get("/:id")
  @HttpCode(200)
  async handle(@Param('id') paymentTypeId: string) {
    const result = await this.getPaymentTypeInfoUseCase.execute(paymentTypeId)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PaymentTypeNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return PaymentTypePresenter.toHTTP(result.value.paymentType);
  }
}