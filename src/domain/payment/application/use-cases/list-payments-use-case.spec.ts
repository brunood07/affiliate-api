
import { makePayment } from 'test/factories/make-payment'
import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository'
import { ListPaymentsUseCase } from './list-payments-use-case'

let inMemoryPaymentsRepository: InMemoryPaymentsRepository
let sut: ListPaymentsUseCase

describe('List Payments Use Case', () => {
  beforeEach(() => {
    inMemoryPaymentsRepository = new InMemoryPaymentsRepository()
    sut = new ListPaymentsUseCase(inMemoryPaymentsRepository)
  })

  it('should be able to list payments', async () => {
    await inMemoryPaymentsRepository.create(makePayment())
    await inMemoryPaymentsRepository.create(makePayment())
    await inMemoryPaymentsRepository.create(makePayment())

    const result = await sut.execute({
      limit: 10,
      page: 1
    })

    expect(result.value.list).toHaveLength(3)
  })

  it('should return empty array when no payments exist', async () => {
    const result = await sut.execute({
      limit: 10,
      page: 1
    })

    expect(result.value.list).toHaveLength(0)
    expect(result.value.list).toEqual([])
  })
})
