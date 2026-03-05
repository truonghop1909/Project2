export interface CustomerDTO {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  demand: string;
  note: string;
}

export interface CustomerRequestDTO {
  fullname?: string;
  phone?: string;
  email?: string;
  demand?: string;
  note?: string;
}

export interface CustomerSearchDTO {
  fullname?: string;
  phone?: string;
  transactionTypeId?: number;
}

export interface AssignmentCustomerDTO {
  customerId: number;
  staffIds: number[];
}

// ⚠️ chỉnh field nếu backend trả khác
export interface StaffAssignmentDTO {
  staffId: number;
  fullname: string;
  checked: boolean;
}

export interface TransactionDTO {
  id?: number;
  customerId?: number;

  transactiontypeId?: number;
  transactionTypeName?: string; // ✅ tên loại giao dịch

  customerName?: string;        // ✅ tên khách
  customerPhone?: string;       // ✅ sđt khách

  note?: string;
  date?: string; // server trả Date -> FE nhận string
}

export interface TransactionTypeDTO {
  id: number
  name: string
}