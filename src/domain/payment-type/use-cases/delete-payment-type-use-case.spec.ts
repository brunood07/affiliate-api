import { makePaymentType } from 'test/factories/make-payment-type'
import { InMemoryPaymentTypesRepository } from 'test/repositories/in-memory-payment-types-repository'
import { DeletePaymentTypeUseCase } from './delete-payment-type-use-case'

let paymentTypesRepository: InMemoryPaymentTypesRepository
let sut: DeletePaymentTypeUseCase

describe('Delete Payment Type Use Case', () => {

  beforeEach(() => {
    paymentTypesRepository = new InMemoryPaymentTypesRepository();
    sut = new DeletePaymentTypeUseCase(paymentTypesRepository);
  });
  it('should delete a payment type', async () => {
    const paymentType = makePaymentType()
    await paymentTypesRepository.create(paymentType)

    await sut.execute(paymentType.id.toString())

    const deletedPaymentType = await paymentTypesRepository.findById(paymentType.id.toString())
    expect(deletedPaymentType).toBeNull()
  })

  it('should not delete a non-existing payment type', async () => {
    const response = await sut.execute('non-existing-id')
    expect(response.isLeft).toBeTruthy();
  })
})
