import { PaymentsRepository } from "@/domain/payment/application/repositories/payments-repository";
import { FindByAffiliatedIdResponse, ListPaymentsRequestDTO, ListPaymentsResponseDTO, PaymentInfo, UpdatePaymentDTO } from "@/domain/payment/application/repositories/payments-repository.types";
import { Payment } from "@/domain/payment/entities/payment";

export class InMemoryPaymentsRepository implements PaymentsRepository {
  public items: Payment[] = []

  async create(payment: Payment): Promise<void> {
    this.items.push(payment)
  }

  async findById(id: string): Promise<Payment | null> {
    const payment = this.items.find(item => item.id.toString() === id)
    if (!payment) return null
    return payment
  }

  async list(params: ListPaymentsRequestDTO): Promise<ListPaymentsResponseDTO> {
    const { page = 1, limit = 10, paymentType } = params
    const start = (page - 1) * limit
    const end = start + limit

    const filteredItems = paymentType
      ? this.items.filter(item => item.paymentTypeId === paymentType)
      : this.items

    const list = filteredItems.slice(start, end)
    const totalOfRecords = filteredItems.length
    const totalOfPages = Math.ceil(totalOfRecords / limit)

    return {
      page,
      limit,
      totalOfRecords,
      totalOfPages,
      list,
    }
  }
  async update(id: string, data: UpdatePaymentDTO): Promise<Payment> {
    const itemIndex = this.items.findIndex(item => item.id.toString() === id)
    if (itemIndex === -1) throw new Error('Payment not found')

    const payment = this.items[itemIndex]
    this.items[itemIndex] = {
      ...payment,
      ...data,
    } as Payment

    return this.items[itemIndex]
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id.toString() === id)
    if (itemIndex === -1) throw new Error('Payment not found')

    this.items.splice(itemIndex, 1)
  }

  async findByAffiliateId(affiliateId: string, page: number, limit: number): Promise<FindByAffiliatedIdResponse> {
    const payments = this.items.filter(item => item.affiliateId === affiliateId)
    const totalOfRecords = payments.length
    const totalOfPages = Math.ceil(totalOfRecords / limit)
    const start = (page - 1) * limit
    const end = start + limit
    const list = payments.slice(start, end)

    return {
      page,
      limit,
      totalOfRecords,
      totalOfPages,
      affiliateName: "",
      list: list.map(payment => ({
        paymentId: payment.id.toString(),
        paymentTypeName: payment.paymentTypeId,
        registeredByName: payment.registeredBy,
        createdAt: new Date()
      }))
    }
  }

  async countAffiliatesWithCompletePaymentsInMonth(month: string): Promise<number> {
    const startOfMonth = new Date(month)
    const endOfMonth = new Date(new Date(month).setMonth(startOfMonth.getMonth() + 1))

    const paymentsInMonth = this.items.filter(payment => 
      new Date() >= startOfMonth && 
      new Date() < endOfMonth
    )

    const affiliatePayments = new Map<string, number>()
    
    paymentsInMonth.forEach(payment => {
      const current = affiliatePayments.get(payment.affiliateId.toString()) || 0
      affiliatePayments.set(payment.affiliateId.toString(), current + 1)
    })

    const totalRequiredPayments = 3 // Example number of required payments
    return Array.from(affiliatePayments.values()).filter(count => 
      count === totalRequiredPayments
    ).length
  }
}