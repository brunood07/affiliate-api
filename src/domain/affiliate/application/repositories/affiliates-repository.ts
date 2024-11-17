import { Affiliate } from "../../entities/affiliate";
import { ListAffiliatesParams, ListAffiliatesResponseDTO, UpdateAffiliateInfoRequestDTO } from "./afiiliates-repository.types";

export abstract class AffiliateRepository {
  abstract create(data: Affiliate): Promise<void>;
  abstract findById(id: string): Promise<Affiliate | null>;
  abstract findByPhoneNumberOrEmail(phoneNumber?: string, email?: string): Promise<Affiliate | null>;
  abstract list(params: ListAffiliatesParams): Promise<ListAffiliatesResponseDTO>;
  abstract update(id: string, data: UpdateAffiliateInfoRequestDTO): Promise<Affiliate>;
  abstract delete(id: string): Promise<void>;
}
