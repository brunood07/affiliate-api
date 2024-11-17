
import { InMemoryAffiliatesRepository } from 'test/repositories/in-memory-affiliates-repository'
import { ListAffiliatesUseCase } from './list-affiliates-use-case'
import { makeAffiliate } from 'test/factories/make-affiliate'

let inMemoryAffiliatesRepository: InMemoryAffiliatesRepository
let sut: ListAffiliatesUseCase

describe('List Affiliates Use Case', () => {
  beforeEach(() => {
    inMemoryAffiliatesRepository = new InMemoryAffiliatesRepository()
    sut = new ListAffiliatesUseCase(inMemoryAffiliatesRepository)
  })

  it('should be able to list affiliates', async () => {
    await inMemoryAffiliatesRepository.create(makeAffiliate())
    await inMemoryAffiliatesRepository.create(makeAffiliate())
    await inMemoryAffiliatesRepository.create(makeAffiliate())

    const { value: { list } } = await sut.execute({
      page: 1,
      limit: 10
    })

    expect(list).toHaveLength(3)
  })

  it('should be able to list paginated affiliates', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAffiliatesRepository.create(makeAffiliate())
    }

    const { value: { list } } = await sut.execute({
      page: 3,
      limit: 10
    })

    expect(list).toHaveLength(2)
  })
})
