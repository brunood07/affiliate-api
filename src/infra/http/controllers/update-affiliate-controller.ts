import { UpdateAffiliateUseCase } from "@/domain/affiliate/application/use-cases/update-affiliate-use-case";
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Param, Put, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { AffiliateNotFound } from "@/domain/affiliate/application/use-cases/errors/affiliate-not-found-error";
import { ApiTags } from "@nestjs/swagger";
import { AffiliatePresenter } from "../presenters/affiliate-presenter";

const updateAffiliateBodySchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional()
})

type UpdateAffiliateBodyType = z.infer<typeof updateAffiliateBodySchema>

@ApiTags("Affiliates")
@Controller("/affiliates/:id")
export class UpdateAffiliateController {
  constructor(private readonly updateAffiliateUseCase: UpdateAffiliateUseCase) { }

  @Put()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updateAffiliateBodySchema))
  async handle(
    @Param('id') affiliateId: string,
    @Body() body: UpdateAffiliateBodyType
  ) {
    const { firstName, lastName, email, phoneNumber } = body

    const result = await this.updateAffiliateUseCase.execute(affiliateId, {
      firstName,
      lastName,
      email,
      phoneNumber
    })

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