import { GetAffiliatesAndPaymentInfoPerMonthUseCase } from "@/domain/payment/application/use-cases/get-affiliates-and-payments-info-per-month-use-case"
import { Controller, Get } from "@nestjs/common"

@Controller('affiliates')
export class GetAffiliatesAndPaymentInfoPerMonthController {
  constructor(
    private getAffiliatesAndPaymentInfo: GetAffiliatesAndPaymentInfoPerMonthUseCase,
  ) {}

  @Get('stats')
  async handle(): Promise<any> {
    return await this.getAffiliatesAndPaymentInfo.execute()
  }
}
