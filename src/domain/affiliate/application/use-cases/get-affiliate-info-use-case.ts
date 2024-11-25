import { Injectable } from "@nestjs/common";
import { AffiliateRepository } from "../repositories/affiliates-repository";
import { Either, left, right } from "@/core/either";
import { AffiliateNotFound } from "./errors/affiliate-not-found-error";
import { Affiliate } from "../../entities/affiliate";

type GetAffiliateInfoUseCaseResponseDTO = Either<AffiliateNotFound, {
  affiliate: Affiliate
}>

@Injectable()
export class GetAffiliateInfoUseCase {
  constructor(private readonly affiliateRepository: AffiliateRepository) { }

  execute = async (id: string): Promise<GetAffiliateInfoUseCaseResponseDTO> => {
    const affiliateExists = await this.affiliateRepository.findById(id);
    if (!affiliateExists) return left(new AffiliateNotFound());
    return right({ affiliate: affiliateExists });
  }
}