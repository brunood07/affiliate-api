import { Either, left, right } from "@/core/either";
import { AffiliateRepository } from "../repositories/affiliates-repository";
import { Affiliate } from "../../entities/affiliate";
import { InvalidAffiliateDataError } from "./errors/invalid-affiliate-data-error";
import { AffiliateAlreadyRegisteredError } from "./errors/affiliate-already-registered-error";

interface CreateAffiliateRequestDTO {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
}

type CreateAffiliateResponseDTO = Either<
  InvalidAffiliateDataError | AffiliateAlreadyRegisteredError,
  {
    affiliate: Affiliate
  }
>

export class CreateAffiliateUseCase {
  constructor(private readonly affiliateRepository: AffiliateRepository) { }

  execute = async (data: CreateAffiliateRequestDTO): Promise<CreateAffiliateResponseDTO> => {
    const { firstName, lastName, email, phoneNumber } = data;
    if (!email && !phoneNumber) return left(new InvalidAffiliateDataError());
    const affiliatedAlreadyRegistered = await this.affiliateRepository.findByPhoneNumberOrEmail(phoneNumber, email);
    if (affiliatedAlreadyRegistered) return left(new AffiliateAlreadyRegisteredError(affiliatedAlreadyRegistered.email || affiliatedAlreadyRegistered.phoneNumber));
    const affiliate = Affiliate.create({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    await this.affiliateRepository.create(affiliate);

    return right({
      affiliate
    });
  }
}