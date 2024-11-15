import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer';
import { HasherGenerator } from '@/domain/users/application/cryptography/hasher-generator';

export class FakeHasher implements HasherGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
