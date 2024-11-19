import { Payment } from "../../entities/payment";

interface ListPaymentsResponseDTO {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: Payment[];
}

interface ListPaymentsRequestDTO {
  page: number;
  limit: number;
  paymentType: string;
}

interface UpdatePaymentDTO {
}

export { ListPaymentsResponseDTO, ListPaymentsRequestDTO, UpdatePaymentDTO }