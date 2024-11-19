import { InMemoryPaymentTypesRepository } from 'test/repositories/in-memory-payment-types-repository'
import { CreatePaymentTypeUseCase } from './create-payment-type-use-case'

let paymentTypesRepository: InMemoryPaymentTypesRepository;
let sut: CreatePaymentTypeUseCase;

describe('Create Payment Type Use Case', () => {

  beforeEach(() => {
    paymentTypesRepository = new InMemoryPaymentTypesRepository();
    sut = new CreatePaymentTypeUseCase(paymentTypesRepository);
  });

  it('should create a payment type', async () => {
    const paymentType = await sut.execute({
      name: 'Monthly',
      quantity: '30',
      active: true
    })

    expect(paymentType.isRight).toBeTruthy()
  })
})
