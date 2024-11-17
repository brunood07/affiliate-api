import { InMemoryAffiliatesRepository } from "test/repositories/in-memory-affiliates-repository";
import { makeAffiliate } from "test/factories/make-affiliate";
import { UpdateAffiliateUseCase } from "./update-affiliate-use-case";
import { response } from "express";

let inMemoryAffiliatesRepository: InMemoryAffiliatesRepository;
let sut: UpdateAffiliateUseCase;

describe('Update Affiliate Use Case', () => {
  beforeEach(() => {
    inMemoryAffiliatesRepository = new InMemoryAffiliatesRepository();
    sut = new UpdateAffiliateUseCase(inMemoryAffiliatesRepository);
  });

  it('should be able to update an affiliate', async () => {
    const affiliate = makeAffiliate();
    await inMemoryAffiliatesRepository.create(affiliate);

    const updatedAffiliate = await sut.execute(affiliate.id.toValue(), {
      firstName: "John",
      email: 'newemail@example.com',
      phoneNumber: '1234567890',
    });

    expect(updatedAffiliate.isRight).toBeTruthy();
  });

  it('should not be able to update a non-existing affiliate', async () => {
    const response = await sut.execute("1", {
      firstName: "John",
      email: 'newemail@example.com',
      phoneNumber: '1234567890',
    })

    expect(response.isLeft).toBeTruthy();
  });
});
