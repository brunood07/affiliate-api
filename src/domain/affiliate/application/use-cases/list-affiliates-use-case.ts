import { Injectable } from "@nestjs/common";
import { Affiliate } from "../../entities/affiliate";
import { AffiliateRepository } from "../repositories/affiliates-repository";
import { Either, right } from "@/core/either";

interface ListAffiliatesRequestDTO {
  page: number;
  limit: number;
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

type ListAffiliatesResponseDTO = Either<null, {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: Affiliate[];
}>

@Injectable()
export class ListAffiliatesUseCase {
  constructor(private readonly affialiateRepository: AffiliateRepository) { }

  execute = async (params: ListAffiliatesRequestDTO): Promise<ListAffiliatesResponseDTO> => {
    const response = await this.affialiateRepository.list(params);

    return right({
      page: response.page,
      limit: response.limit,
      totalOfRecords: response.totalOfRecords,
      totalOfPages: response.totalOfPages,
      list: response?.list || []
    })
  }
}