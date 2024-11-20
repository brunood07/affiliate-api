import { CreateAffiliateUseCase } from "@/domain/affiliate/application/use-cases/create-affiliate-use-case";
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { AffiliateAlreadyRegisteredError } from "@/domain/affiliate/application/use-cases/errors/affiliate-already-registered-error";

const createAffiliateBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional()
});

type CreateAffiliateBodyType = z.infer<typeof createAffiliateBodySchema>;

@Controller("/affiliates")
export class CreateAffiliateController {
  constructor(private readonly createAffiliateUseCase: CreateAffiliateUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAffiliateBodySchema))
  async handle(@Body() body: CreateAffiliateBodyType) {
    const { firstName, lastName, email, phoneNumber } = body;
    const result = await this.createAffiliateUseCase.execute({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AffiliateAlreadyRegisteredError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value;
  }
}