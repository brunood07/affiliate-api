import { makePayment } from 'test/factories/make-payment'
import { DeletePaymentUseCase } from './delete-payment-use-case'
import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository'

let inMemoryPaymentsRepository: InMemoryPaymentsRepository
let sut: DeletePaymentUseCase

describe('Delete Payment Use Case', () => {
  beforeEach(() => {
    inMemoryPaymentsRepository = new InMemoryPaymentsRepository()
    sut = new DeletePaymentUseCase(inMemoryPaymentsRepository)
  })

  it('should be able to delete a payment', async () => {
    const newPayment = makePayment()
    await inMemoryPaymentsRepository.create(newPayment)
    await sut.execute(newPayment.id.toString())
    expect(inMemoryPaymentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non existing payment', async () => {
    const result = await sut.execute('non-existing-id')
    expect(result.isLeft()).toBe(true)
  })
})
