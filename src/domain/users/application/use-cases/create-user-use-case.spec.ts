import { FakeHasher } from "test/cryptography/fake-hasher";
import { CreateUserUseCase } from "./create-user-use-case";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: CreateUserUseCase;

describe("Register User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateUserUseCase(usersRepository, fakeHasher);
  });

  it("should be able to register a new user", async () => {
    const result = await sut.execute({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeTruthy();
  });

  it("should not be able to register a new user with same email twice", async () => {
    await sut.execute({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const result = await sut.execute({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  })
});