import { Payment } from "../../entities/payment";

interface ListPaymentsDTO {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: Payment[];
}

interface UpdatePaymentDTO {
}

export { ListPaymentsDTO, UpdatePaymentDTO }