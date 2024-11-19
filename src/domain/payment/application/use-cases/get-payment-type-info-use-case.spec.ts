import { makePaymentType } from 'test/factories/make-payment-type';
import { InMemoryPaymentTypesRepository } from 'test/repositories/in-memory-payment-types-repository';
import { GetPaymentTypeInfoUseCase } from './get-payment-type-info-use-case'

let paymentTypesRepository: InMemoryPaymentTypesRepository;
let sut: GetPaymentTypeInfoUseCase

describe('Get Payment Type Info Use Case', () => {
  beforeEach(() => {
    paymentTypesRepository = new InMemoryPaymentTypesRepository()
    sut = new GetPaymentTypeInfoUseCase(paymentTypesRepository)
  });

  it('should get payment type info', async () => {
    const paymentType = makePaymentType()
    await paymentTypesRepository.create(paymentType)
    const response = await sut.execute(paymentType.id.toString())
    expect(response.isRight).toBeTruthy();
  })

  it('should not get info of non-existing payment type', async () => {
    const response = await sut.execute('non-existing-id');
    expect(response.isLeft).toBeTruthy();
  })
})
