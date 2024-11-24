import { Either, left, right } from "@/core/either";
import { AffiliateRepository } from "../repositories/affiliates-repository";
import { AffiliateNotFound } from "./errors/affiliate-not-found-error";
import { Injectable } from "@nestjs/common";

type DeleteAffiliateResponseDTO = Either<AffiliateNotFound, void>;

@Injectable()
export class DeleteAffiliateUseCase {
  constructor(private readonly affiliateRepository: AffiliateRepository) { }

  execute = async (id: string): Promise<DeleteAffiliateResponseDTO> => {
    const affiliateExists = await this.affiliateRepository.findById(id);
    if (!affiliateExists) return left(new AffiliateNotFound());
    await this.affiliateRepository.delete(id);
    return right(undefined)
  }
}