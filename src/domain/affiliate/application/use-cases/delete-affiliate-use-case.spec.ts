
import { InMemoryAffiliatesRepository } from 'test/repositories/in-memory-affiliates-repository'
import { makeAffiliate } from 'test/factories/make-affiliate'
import { DeleteAffiliateUseCase } from './delete-affiliate-use-case'

let inMemoryAffiliatesRepository: InMemoryAffiliatesRepository
let sut: DeleteAffiliateUseCase

describe('Delete Affiliate', () => {
  beforeEach(() => {
    inMemoryAffiliatesRepository = new InMemoryAffiliatesRepository()
    sut = new DeleteAffiliateUseCase(inMemoryAffiliatesRepository)
  })

  it('should be able to delete a affiliate', async () => {
    const affiliate = makeAffiliate()
    await inMemoryAffiliatesRepository.create(affiliate)
    await sut.execute(affiliate.id.toValue())
    expect(inMemoryAffiliatesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non existing affiliate', async () => {
    const result = await sut.execute("id");
    expect(result.isLeft()).toBe(true)
  })
})
