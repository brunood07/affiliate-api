import { Either, left } from "@/core/either";
import { AffiliateRepository } from "../repositories/affiliates-repository";
import { AffiliateNotFound } from "./errors/affiliate-not-found-error";

type DeleteAffiliateResponseDTO = Either<AffiliateNotFound, void>;

export class DeleteAffiliateUseCase {
  constructor(private readonly affiliateRepository: AffiliateRepository) { }

  execute = async (id: string): Promise<DeleteAffiliateResponseDTO> => {
    const affiliateExists = await this.affiliateRepository.findById(id);
    if (!affiliateExists) return left(new AffiliateNotFound());
    await this.affiliateRepository.delete(id);
  }
}