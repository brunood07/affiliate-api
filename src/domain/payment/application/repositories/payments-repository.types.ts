import { Payment } from "../../entities/payment";

interface ListPaymentsResponseDTO {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: Payment[];
}

interface PaymentInfo {
  paymentId: string;
  paymentTypeName: string;
  registeredByName: string;
  createdAt: Date;
}

interface ListPaymentsRequestDTO {
  page: number;
  limit: number;
  paymentType?: string;
}

interface FindByAffiliatedIdResponse {
  page: number;
  limit: number;
  affiliateName: string;
  totalOfRecords: number;
  totalOfPages: number;
  list: PaymentInfo[];
}

interface UpdatePaymentDTO {
}

export { ListPaymentsResponseDTO, ListPaymentsRequestDTO, UpdatePaymentDTO, PaymentInfo, FindByAffiliatedIdResponse }