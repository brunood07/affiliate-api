import { AffiliateRepository } from "@/domain/affiliate/application/repositories/affiliates-repository";
import { PaymentsRepository } from "../repositories/payments-repository";
import { Either, left, right } from "@/core/either";
import { AffiliateNotFound } from "@/domain/affiliate/application/use-cases/errors/affiliate-not-found-error";
import { PaymentInfo } from "../repositories/payments-repository.types";

interface GetAffiliatePaymentsUseCaseRequestDTO {
  affiliateId: string;
  page: number;
  limit: number;
}

type GetAffiliatePaymentsUseCaseResponseDTO = Either<AffiliateNotFound, {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: PaymentInfo[];
}>

export class GetAffiliatePaymentsUseCase {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly affiliatesRepository: AffiliateRepository
  ) { }

  execute = async (data: GetAffiliatePaymentsUseCaseRequestDTO): Promise<GetAffiliatePaymentsUseCaseResponseDTO> => {
    const affiliate = await this.affiliatesRepository.findById(data.affiliateId);
    if (!affiliate) return left(new AffiliateNotFound());
    const result = await this.paymentsRepository.findByAffiliateId(data.affiliateId, data.page, data.limit);

    return right(result)
  }
}