import { AffiliateRepository } from "@/domain/affiliate/application/repositories/affiliates-repository";
import { PaymentsRepository } from "../repositories/payments-repository";
import { Injectable } from "@nestjs/common";

interface MonthlyStats {
  month: string
  totalAffiliates: number
  affiliatesWithCompletePayments: number
}

@Injectable()
export class GetAffiliatesAndPaymentInfoPerMonthUseCase {
  constructor(
    private affiliatesRepository: AffiliateRepository,
    private paymentRepository: PaymentsRepository
  ) {}

  async execute(): Promise<MonthlyStats[]> {
    const last6Months = this.getLast6Months()
    
    const monthlyStats = await Promise.all(
      last6Months.map(async (month) => {
        const totalAffiliates = await this.affiliatesRepository.countTotalAffiliatesInMonth(month)
        const affiliatesWithCompletePayments = 
          await this.paymentRepository.countAffiliatesWithCompletePaymentsInMonth(month)

        return {
          month,
          totalAffiliates,
          affiliatesWithCompletePayments,
        }
      })
    )

    return monthlyStats
  }

  private getLast6Months(): string[] {
    const months: string[] = []
    const today = new Date()

    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      months.push(date.toISOString().substring(0, 7))
    }

    return months.reverse()
  }
}
