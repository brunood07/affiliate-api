import { Affiliate } from "../../entities/affiliate";

interface ListAffiliatesParams {
  page: number;
  limit: number;
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface ListAffiliatesResponseDTO {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: Affiliate[];
}

interface UpdateAffiliateInfoRequestDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export { ListAffiliatesParams, ListAffiliatesResponseDTO, UpdateAffiliateInfoRequestDTO }