import { PaymentNotFoundError } from "@/domain/payment/application/use-cases/errors/payment-not-found-error";
import { GetPaymentInfoUseCase } from "@/domain/payment/application/use-cases/get-payment-info-use-case";
import { BadRequestException, ConflictException, Controller, Get, HttpCode, Param } from "@nestjs/common";

@Controller("/payments/:id")
export class GetPaymentInfoController {
  constructor(private readonly getPaymentInfoUseCase: GetPaymentInfoUseCase) { }

  @Get()
  @HttpCode(200)
  async handle(@Param('id') paymentId: string) {
    const result = await this.getPaymentInfoUseCase.execute(paymentId);

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PaymentNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value;
  }
}