import { InMemoryAffiliatesRepository } from "test/repositories/in-memory-affiliates-repository";
import { GetAffiliateInfoUseCase } from "./get-affiliate-info-use-case";
import { AffiliateNotFound } from "./errors/affiliate-not-found-error";
import { makeAffiliate } from "test/factories/make-affiliate";

let affiliateRepository: InMemoryAffiliatesRepository;
let sut: GetAffiliateInfoUseCase;

describe("Get Affiliate info tests", () => {
  beforeEach(() => {
    affiliateRepository = new InMemoryAffiliatesRepository();
    sut = new GetAffiliateInfoUseCase(affiliateRepository);
  });

  it("should be able to get affiliate info", async () => {
    const affiliate = makeAffiliate();
    await affiliateRepository.create(affiliate);
    const result = await sut.execute(affiliate.id.toString());
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.affiliate).toEqual(affiliate);
    }
  });
  it("should not be able to get info of a non-existing affiliate", async () => {
    const result = await sut.execute("non-existing-affiliate-id");
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AffiliateNotFound);
  });
});