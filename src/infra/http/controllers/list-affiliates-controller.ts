import { ListAffiliatesUseCase } from "@/domain/affiliate/application/use-cases/list-affiliates-use-case";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { AffiliatePresenter } from "../presenters/affiliate-presenter";

export const listAffiliatesSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

@ApiTags("Affiliates")
@Controller("/affiliates")
export class ListAffiliatesController {
  constructor(private readonly listAffiliatesUseCase: ListAffiliatesUseCase) { }

  @Get("/list")
  async handle(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('phoneNumber') phoneNumber?: string,
    @Query('email') email?: string,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
  ) {
    const params = listAffiliatesSchema.parse({
      page: Number(page),
      limit: Number(limit),
      phoneNumber,
      email,
      firstName,
      lastName
    })

    const result = await this.listAffiliatesUseCase.execute({
      page: params.page,
      limit: params.limit,
      phoneNumber: params.phoneNumber,
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName
    })

    return {
      ...result.value,
      list: result.value.list.map(AffiliatePresenter.toHTTP)
    }
  }
}