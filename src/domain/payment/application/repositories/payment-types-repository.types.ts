import { PaymentType } from "../../entities/payment-type";

interface UpdatePaymentTypeDTO {
  name?: string;
  quantity?: string;
  active?: boolean;
}

interface ListPaymentTypesParamsDTO {
  page: number
  limit: number
}

interface ListPaymentTypesDTO {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: PaymentType[];
}

export { UpdatePaymentTypeDTO, ListPaymentTypesDTO, ListPaymentTypesParamsDTO }