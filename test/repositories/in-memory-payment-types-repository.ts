import { PaymentTypesRepository } from '@/domain/payment/application/repositories/payment-types-repository'
import { ListPaymentTypesDTO, ListPaymentTypesParamsDTO } from '@/domain/payment/application/repositories/payment-types-repository.types'
import { PaymentType } from '@/domain/payment/entities/payment-type'
import { randomUUID } from 'node:crypto'

export class InMemoryPaymentTypesRepository implements PaymentTypesRepository {
  public items: PaymentType[] = []

  async create(data: PaymentType): Promise<void> {
    this.items.push(data)
  }

  async findById(id: string): Promise<PaymentType | null> {
    const paymentType = this.items.find((item) => item.id.toString() === id)

    if (!paymentType) {
      return null
    }

    return paymentType
  }

  async list(params: ListPaymentTypesParamsDTO): Promise<ListPaymentTypesDTO> {
    const { page = 1, limit = 10 } = params

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const list = this.items.slice(startIndex, endIndex)
    const totalOfRecords = this.items.length
    const totalOfPages = Math.ceil(totalOfRecords / limit)

    return {
      page,
      limit,
      totalOfRecords,
      totalOfPages,
      list,
    }
  }

  async update(id: string, data: Partial<PaymentType>): Promise<PaymentType> {
    const paymentTypeIndex = this.items.findIndex((item) => item.id.toString() === id)

    const paymentType = this.items[paymentTypeIndex]

    Object.assign(paymentType, data)

    return paymentType
  }

  async delete(id: string): Promise<void> {
    const paymentTypeIndex = this.items.findIndex((item) => item.id.toString() === id)
    this.items.splice(paymentTypeIndex, 1)
  }
}
