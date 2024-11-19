import { CreatePaymentUseCase } from './create-payment-use-case'
import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository'
import { randomUUID } from 'crypto'

let paymentsRepository: InMemoryPaymentsRepository;
let sut: CreatePaymentUseCase;

describe('CreatePaymentResponseDTO', () => {
  beforeEach(() => {
    paymentsRepository = new InMemoryPaymentsRepository();
    sut = new CreatePaymentUseCase(paymentsRepository);
  })

  it('should return right with payment when successful', async () => {
    const result = await sut.execute({
      affiliateId: randomUUID(),
      paymentTypeId: randomUUID(),
      registeredBy: randomUUID()
    })

    expect(result.isRight()).toBeTruthy()
  })
})
