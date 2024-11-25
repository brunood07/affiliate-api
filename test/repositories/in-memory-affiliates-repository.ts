import { AffiliateRepository } from "@/domain/affiliate/application/repositories/affiliates-repository";
import { ListAffiliatesParams, ListAffiliatesResponseDTO, UpdateAffiliateInfoRequestDTO } from "@/domain/affiliate/application/repositories/afiiliates-repository.types";
import { Affiliate } from "@/domain/affiliate/entities/affiliate";

export class InMemoryAffiliatesRepository implements AffiliateRepository {
  public items: Affiliate[] = [];

  async create(data: Affiliate): Promise<void> {
    this.items.push(data);
  }

  async findById(id: string): Promise<Affiliate | null> {
    const affiliate = this.items.find(item => item.id.toString() === id);
    if (!affiliate) return null;
    return affiliate;
  }

  async findByPhoneNumberOrEmail(phoneNumber?: string, email?: string): Promise<Affiliate | null> {
    const affiliate = this.items.find(item =>
      item.phoneNumber === phoneNumber || item.email === email
    );
    if (!affiliate) return null;
    return affiliate;
  }

  async list(params: ListAffiliatesParams): Promise<ListAffiliatesResponseDTO> {
    const { page = 1, limit = 20, email, firstName, lastName, phoneNumber } = params;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const filteredItems = this.items.filter(item => {
      const matchEmail = !email || item.email.toLowerCase().includes(email.toLowerCase());
      const matchFirstName = !firstName || item.firstName.toLowerCase().includes(firstName.toLowerCase());
      const matchLastName = !lastName || item.lastName.toLowerCase().includes(lastName.toLowerCase());
      const matchPhoneNumber = !phoneNumber || item.phoneNumber.includes(phoneNumber);

      return matchEmail && matchFirstName && matchLastName && matchPhoneNumber;
    });

    const items = filteredItems.slice(startIndex, endIndex);
    const total = filteredItems.length;

    return {
      list: items,
      totalOfRecords: total,
      page,
      limit,
      totalOfPages: Math.ceil(total / limit)
    };
  }
  async update(id: string, data: UpdateAffiliateInfoRequestDTO): Promise<Affiliate> {
    const affiliateIndex = this.items.findIndex(item => item.id.toString() === id);
    if (affiliateIndex === -1) {
      throw new Error('Affiliate not found');
    }

    const affiliate = this.items[affiliateIndex];
    this.items[affiliateIndex].firstName = data.firstName ?? affiliate.firstName;
    this.items[affiliateIndex].lastName = data.lastName ?? affiliate.lastName;
    this.items[affiliateIndex].email = data.email ?? affiliate.email;
    this.items[affiliateIndex].phoneNumber = data.phoneNumber ?? affiliate.phoneNumber;

    return this.items[affiliateIndex];
  }
  async delete(id: string): Promise<void> {
    const affiliateIndex = this.items.findIndex(item => item.id.toString() === id);
    if (affiliateIndex !== -1) {
      this.items.splice(affiliateIndex, 1);
    }
  }

  async countTotalAffiliatesInMonth(month: string): Promise<number> {
    return this.items.length;
  }
}