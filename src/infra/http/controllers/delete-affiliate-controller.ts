import { DeleteAffiliateUseCase } from "@/domain/affiliate/application/use-cases/delete-affiliate-use-case";
import { AffiliateNotFound } from "@/domain/affiliate/application/use-cases/errors/affiliate-not-found-error";
import { BadRequestException, ConflictException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Affiliates")
@Controller("/affiliates/:id")
export class DeleteAffiliateController {
  constructor(private readonly deleteAffiliateUseCase: DeleteAffiliateUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') affiliateId: string) {
    const result = await this.deleteAffiliateUseCase.execute(affiliateId);

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AffiliateNotFound:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value
  }
}