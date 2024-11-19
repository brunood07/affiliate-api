
import { makePaymentType } from 'test/factories/make-payment-type';
import { InMemoryPaymentTypesRepository } from 'test/repositories/in-memory-payment-types-repository';
import { ListPaymentTypesUseCase } from './list-payment-types-use-case'

let paymentTypesRepository: InMemoryPaymentTypesRepository;
let sut: ListPaymentTypesUseCase

describe('List Payment Types Use Case', () => {
  beforeEach(() => {
    paymentTypesRepository = new InMemoryPaymentTypesRepository()
    sut = new ListPaymentTypesUseCase(paymentTypesRepository)
  });

  it('should list all payment types', async () => {
    await paymentTypesRepository.create(makePaymentType())
    await paymentTypesRepository.create(makePaymentType())

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response).toBeTruthy()
  })
})
