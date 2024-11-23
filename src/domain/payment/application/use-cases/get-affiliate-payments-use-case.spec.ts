import { InMemoryAffiliatesRepository } from "test/repositories/in-memory-affiliates-repository";
import { InMemoryPaymentsRepository } from "test/repositories/in-memory-payments-repository";
import { GetAffiliatePaymentsUseCase } from "./get-affiliate-payments-use-case";
import { makeAffiliate } from "test/factories/make-affiliate";
import { makePayment } from "test/factories/make-payment";

let affiliateRepository: InMemoryAffiliatesRepository;
let paymentsRepository: InMemoryPaymentsRepository;
let sut: GetAffiliatePaymentsUseCase;

describe('GetAffiliatePaymentsUseCase', () => {
  beforeEach(() => {
    affiliateRepository = new InMemoryAffiliatesRepository();
    paymentsRepository = new InMemoryPaymentsRepository();
    sut = new GetAffiliatePaymentsUseCase(paymentsRepository, affiliateRepository);
  });

  it('should return empty array when affiliate has no payments', async () => {
    const result = await sut.execute({
      affiliateId: 'non-existing-id',
      page: 1,
      limit: 10
    });
    expect(result.isLeft).toBeTruthy();
  });

  it('should return affiliate payments correctly', async () => {
    const affiliate = makeAffiliate();
    const payment1 = makePayment();
    const payment2 = makePayment();
    await affiliateRepository.create(affiliate);

    await paymentsRepository.create(payment1);

    await paymentsRepository.create(payment2);

    const result = await sut.execute({
      affiliateId: affiliate.id.toString(),
      page: 1,
      limit: 10
    });

    expect(result.isRight).toBeTruthy();
  });

  it('should throw error if affiliate does not exist', async () => {
    const result = await sut.execute({
      affiliateId: 'non-existing-id',
      page: 1,
      limit: 10
    })
    expect(result.isLeft).toBeTruthy();
  });
});