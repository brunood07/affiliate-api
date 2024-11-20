
import { InMemoryPaymentsRepository } from 'test/repositories/in-memory-payments-repository';
import { GetPaymentInfoUseCase } from './get-payment-info-use-case';
import { makePayment } from 'test/factories/make-payment';

let paymentRepository: InMemoryPaymentsRepository;
let sut: GetPaymentInfoUseCase;

describe('GetPaymentInfoUseCase', () => {

  beforeEach(() => {
    paymentRepository = new InMemoryPaymentsRepository();
    sut = new GetPaymentInfoUseCase(paymentRepository);
  });

  it('should get payment info successfully', async () => {
    const newPayment = makePayment()
    await paymentRepository.create(newPayment)
    const result = await sut.execute(newPayment.id.toString());
    expect(result.isRight).toBeTruthy()
  });

  it('should throw error when payment not found', async () => {
    const result = await sut.execute('123');
    expect(result.isLeft).toBeTruthy();
  });
});
