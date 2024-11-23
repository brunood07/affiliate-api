import { AffiliateNotFound } from "@/domain/affiliate/application/use-cases/errors/affiliate-not-found-error";
import { GetAffiliatePaymentsUseCase } from "@/domain/payment/application/use-cases/get-affiliate-payments-use-case";
import { BadRequestException, ConflictException, Controller, Get, HttpCode, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Affiliate")
@Controller("/affiliate/payments")
export class GetAffiliatePaymentsController {
  constructor(private readonly getAffiliatePaymentsUseCase: GetAffiliatePaymentsUseCase) { }


  @Get("/:id")
  @HttpCode(200)
  async handle(
    @Param('id') affiliateId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    const result = await this.getAffiliatePaymentsUseCase.execute({ affiliateId, page: Number(page), limit: Number(limit) })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AffiliateNotFound:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value;
  }
}