import { Affiliate } from "@/domain/affiliate/entities/affiliate";

export class AffiliatePresenter {
  static toHTTP(affiliate: Affiliate) {
    return {
      id: affiliate.id.toString(),
      firstName: affiliate.firstName,
      lastName: affiliate.lastName,
      email: affiliate.email,
      phoneNumber: affiliate.phoneNumber
    }
  }
}