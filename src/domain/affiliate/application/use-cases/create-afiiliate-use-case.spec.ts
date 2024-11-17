import { InMemoryAffiliatesRepository } from "test/repositories/in-memory-affiliates-repository";
import { CreateAffiliateUseCase } from "./create-affiliate-use-case";

let sut: CreateAffiliateUseCase;
let affiliatesRepository: InMemoryAffiliatesRepository;

describe('Create Affiliate Use Case', () => {
  beforeEach(() => {
    affiliatesRepository = new InMemoryAffiliatesRepository();
    sut = new CreateAffiliateUseCase(affiliatesRepository);
  });

  it('should create a new affiliate', async () => {
    const result = await sut.execute({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123",
      email: "johndoe@example.com",
    });

    expect(result.isRight()).toBe(true);
    expect(affiliatesRepository.items[0].id).toBeTruthy();
    expect(affiliatesRepository.items[0].firstName).toEqual("John");
    expect(affiliatesRepository.items[0].lastName).toEqual("Doe");
    expect(affiliatesRepository.items[0].phoneNumber).toEqual("123");
    expect(affiliatesRepository.items[0].email).toEqual("johndoe@example.com");
  });

  it('should not create affiliate with existing email', async () => {
    await sut.execute({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123",
      email: "johndoe@example.com",
    });

    const result = await sut.execute({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234",
      email: "johndoe@example.com",
    });

    expect(result.isLeft()).toBe(true);
    expect(affiliatesRepository.items).toHaveLength(1);
  });

  it('should not create affiliate with existing phonenumber', async () => {
    await sut.execute({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234",
      email: "johndoe@example.com",
    });

    const result = await sut.execute({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234",
      email: "johndoe2@example.com",
    });

    expect(result.isLeft()).toBe(true);
    expect(affiliatesRepository.items).toHaveLength(1);
  });
});
