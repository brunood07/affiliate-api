import { AffiliateNotFound } from "@/domain/affiliate/application/use-cases/errors/affiliate-not-found-error";
import { GetAffiliateInfoUseCase } from "@/domain/affiliate/application/use-cases/get-affiliate-info-use-case";
import { Param, ConflictException, BadRequestException, Controller, Get, HttpCode } from "@nestjs/common";
import { AffiliatePresenter } from "../presenters/affiliate-presenter";

@Controller("/affiliates/info")
export class GetAffiliateInfoController {
  constructor(private readonly getAffiliateInfoUseCase: GetAffiliateInfoUseCase) { }

  @Get(":id")
  @HttpCode(200)
  async handle(@Param('id') affiliateI: string) {
    const result = await this.getAffiliateInfoUseCase.execute(affiliateI)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AffiliateNotFound:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return AffiliatePresenter.toHTTP(result.value.affiliate);
  }
}