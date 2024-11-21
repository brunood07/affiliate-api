import { Either, left, right } from "@/core/either";
import { AffiliateRepository } from "../repositories/affiliates-repository";
import { Affiliate } from "../../entities/affiliate";
import { AffiliateNotFound } from "./errors/affiliate-not-found-error";
import { Injectable } from "@nestjs/common";

interface UpdateAffiliateRequestDTO {
  firstName?: string
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

type UpdateAffiliateResponseDTO = Either<AffiliateNotFound,
  {
    affiliate: Affiliate
  }
>;

@Injectable()
export class UpdateAffiliateUseCase {
  constructor(private readonly affiliateRepository: AffiliateRepository) { }

  execute = async (id: string, data: UpdateAffiliateRequestDTO): Promise<UpdateAffiliateResponseDTO> => {
    const affiliateExists = await this.affiliateRepository.findById(id);
    if (!affiliateExists) return left(new AffiliateNotFound());
    const updatedAffiliate = await this.affiliateRepository.update(id, data);

    return right({
      affiliate: updatedAffiliate
    })
  }
}