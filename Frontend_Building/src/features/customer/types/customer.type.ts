export interface CustomerDTO {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  demand: string;
  note: string;

  approvalStatus?: string;

  createdAt?: string;
  createdBy?: number;
  createdByName?: string;

  approvedAt?: string;
  approvedBy?: number;
  approvedByName?: string;
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

  approvalStatus?: string;
  staffId?: number;
  staffName?: string;
}

export interface AssignmentCustomerDTO {
  customerId: number;
  staffIds: number[];
}

export interface StaffAssignmentDTO {
  staffId: number;
  fullname: string;
  checked: boolean;
}

export interface TransactionDTO {
  id?: number;
  customerId?: number;

  transactiontypeId?: number;
  transactionTypeName?: string;

  customerName?: string;
  customerPhone?: string;

  note?: string;
  date?: string;
}

export interface TransactionTypeDTO {
  id: number;
  name: string;
}