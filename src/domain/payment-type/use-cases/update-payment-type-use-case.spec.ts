import { InMemoryPaymentTypesRepository } from 'test/repositories/in-memory-payment-types-repository'
import { UpdatePaymentTypeUseCase } from './update-payment-type-use-case'
import { makePaymentType } from 'test/factories/make-payment-type';

let paymentTypesRepository: InMemoryPaymentTypesRepository;
let sut: UpdatePaymentTypeUseCase;

describe('Update Payment Type Use Case', () => {
  beforeEach(() => {
    paymentTypesRepository = new InMemoryPaymentTypesRepository();
    sut = new UpdatePaymentTypeUseCase(paymentTypesRepository);
  })

  it('should update a payment type', async () => {
    const type = makePaymentType()
    await paymentTypesRepository.create(type)

    const paymentType = await sut.execute(type.id.toString(), {
      name: 'Updated Name',
    })

    expect(paymentType.isRight).toBeTruthy();
  })

  it('should not update a non-existing payment type', async () => {
    const response = await sut.execute('non-existing-id', {
      name: 'Updated Name',
    })

    expect(response.isLeft).toBeTruthy();
  })
})
